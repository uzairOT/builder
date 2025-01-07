import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import "../../../App.css";
import Close from "@mui/icons-material/Close";
import { useProjectGenAIMutation } from "../../../redux/apis/Project/projectApiSlice";
import {GoogleGenerativeAI} from '@google/generative-ai'; // Adjust based on the actual package name
import { toast } from "react-toastify";

const prompt = `
You are a helpful assistant for a react-based construction app. Your task is to generate project phase and line item data based on a project description provided by the user.

Instructions:

1.  Project Context: Projects are divided into phases (one or more). Each phase contains line items representing expenditures.

2.  Phase Data: For each phase, provide:
       phaseName: The name of the phase.
       color: A random dark hexadecimal color code (e.g., #208C00).

3.  Line Item Data: For each line item within a phase, provide:
       title: The name of the line item.
       description: A brief description of the item.
       unit: The unit of measurement (e.g., kg, lb, m).
       quantity: An estimated quantity.
       unit_price: An estimated unit price.
       total: The calculated cost price (unit_price * quantity).
       margin: A 10% profit margin on the total (calculated as total * 0.1).
       notes: Optional additional notes.

4.  Estimates: Provide reasonable estimates for quantities and prices. Accuracy is not critical, but values should be contextually appropriate.

5.  Response Format: Return a JSON representing the project data. The map should follow this structure (STRICTLY ONLY RETURN THE JSON, NO ADDED BACK TICKS OR STRINGS):

 ex:
    {
      "phases": [
        {
          "phaseName": "Phase 1 Name",
          "color": "#123456",
          "lineItems": [
            {
              "title": "Line Item 1",
              "description": "Description of item 1",
              "unit": "unit",
              "quantity": 1,
              "unit_price": 1.0,
              "total": 1.0,
              "margin": 0.1,
              "notes": "Optional notes"
            },
            {
                //... more line items
            }
          ]
        },
        {
            //... more phases
        }
      ]
    }


6. Error Handling: If the project description is unclear, unrelated to construction, or you are unable to generate relevant data, return the following JSON (STRICTLY ONLY RETURN THE JSON, NO ADDED BACK TICKS OR STRINGS) ex: {"error": "invalid project description"}.

Now, generate phases and line items for the following project description:
`;


function GenerativeAiDialogue({
    closeGenAiDialogue,
    projectId,
    fetchData
}) {
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateWithAI] = useProjectGenAIMutation();
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEN_AI_KEY);
    // const model = genAI.getModel("gemini-1.5-pro-001");
    console.log("Hello",genAI);
    // console.log(model);
    const handleSetAiPrompt = (e) => {
        setAiPrompt(e.target.value);
    }
    const handleClickClose = () => {
        closeGenAiDialogue();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsGenerating(true)
        try{

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });
            console.log(model);
            const result = await model.generateContent([prompt + aiPrompt]);
            const response = await result.response;
            const text = await response.text();
            console.log(text);
            const genAIResponse = JSON.parse(text);
            const phases = genAIResponse.phases || genAIResponse.error;
            const data = { phases, projectId };
            const responseAi = await generateWithAI(data);
            if(responseAi?.error){
                toast.error(responseAi?.error?.data.message);
            }else{
                toast.success(responseAi?.data?.message);
            }
            setIsGenerating(false)
            await fetchData();
            handleClickClose();
        }catch(err){
            console.log(err);
            toast.error("Something went wrong!");
            setIsGenerating(false)
        }
    }

  return (
    <div className="App">
      <>
        <Dialog
          open={true}
          onClose={handleClickClose}
          PaperProps={{
            sx: { ...paperPropsStyle },
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DialogTitle sx={typoTitle}>Generate with AI</DialogTitle>
            <IconButton
              style={{ width: "40px", height: "40px" }}
              onClick={handleClickClose}
            >
              <Close />
            </IconButton>
          </Stack>
          <DialogContent sx={{ padding: "0rem 1.5rem 3rem 1.5rem" }}>
            <Typography sx={typoText}>Description</Typography>
            <TextField
              inputProps={{ maxLength: 150 }}
              sx={{
                ...inputStyle,
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "var(--main-font-family)",
                },
              }}
              margin="dense"
              id="aiPrompt"
              name="aiPrompt"
              placeholder={"ex: I want to remodel my kitchen"}
              // label="Email Address"
              type="text"
              variant="standard"
              value={aiPrompt}
              onChange={handleSetAiPrompt}
            />
            <Typography sx={typoText}>Provide a detailed description of your project to generate a suggested breakdown of phases and associated line items using AI. Processing may take up to 30 seconds.</Typography>
            <Typography sx={{...typoText, color: "red", fontSize:'14px'}}>Warning: This will rewrite your previously saved phases and line Items.</Typography>
          </DialogContent>
          <DialogActions sx={generalBox}>
            <Button
              sx={{
                ...actionButton,
                ...addPhaseButton,
                minWidth: "10rem !important",
              }}
              type="submit"
              onClick={handleSubmit}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

const typoTitle = {
  fontFamily: "var(--main-font-family)",
  fontSize: "1.5rem",
  color: "#4C8AB1",
};
const inputStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: "1rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  paddingLeft: "-1.5rem",
  backgroundColor: "#EDF2F6",
};

const generalBox = {
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
};

const paperPropsStyle = {
  borderRadius: "1rem",
  width: { lg: "25%", md: "50%", sm: "100%", xs: "100%" },
  padding: "0.5rem", // Change background color here
};

const typoText = {
  fontFamily: "var(--main-font-family)",
  fontSize: "1rem",
  color: "#202227",
};
const addPhaseButton = {
  height: "70%",
  width: "9rem",
  marginTop: "-2rem",
};
export default GenerativeAiDialogue;
