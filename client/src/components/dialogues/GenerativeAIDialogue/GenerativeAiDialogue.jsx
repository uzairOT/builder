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
  Box,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import "../../../App.css";
import Close from "@mui/icons-material/Close";
import { useProjectGenAIMutation } from "../../../redux/apis/Project/projectApiSlice";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Adjust based on the actual package name
import { toast } from "react-toastify";
import loader from "../../../assets/gifs/loader.gif";

const createConstructionPrompt = (
  projectDescription,
  projectSize,
  projectProfit
) => {
  return `
# Construction Project Estimation Generator

## Objective
Generate accurate phase and line item data for construction projects in valid JSON format. Strictly handle non-construction projects with error responses.

## Input Parameters
- Project Description: ${projectDescription}
- Project Size: ${projectSize}
- Profit Margin: ${projectProfit}%

## Validation Criteria
1. FIRST check if the project is construction-related (e.g., buildings, infrastructure, renovations, new build, remodel, commercial, residential, etc.)
2. Reject and return error JSON if:
   - Description is unclear/unrelated to construction
   - Contains nonsensical text or jokes
   - Lacks measurable components
   - Is about software, abstract concepts, or non-physical projects

## Data Generation Guidelines

### Phase Creation
1. Create 2-5 logical construction phases
2. Phase Names: Use standard construction terminology (e.g., "Site Preparation", "Foundation Work")
3. Colors: Random dark hex colors (#000000 to #7F7F7F)

### Line Items
For each phase, include 3-8 items with:
1. Title: Specific material/labor item (e.g., "Reinforced Concrete", "Electrical Wiring")
2. Description: Clear purpose/implementation details
3. Unit: Context-appropriate measurement (sq.ft, lb, m, etc.)
4. Quantity: Size-adjusted estimate based on ${projectSize}
5. Unit Price: Market-realistic pricing (research typical construction costs)
6. Total: quantity × unit_price
7. Margin: ${projectProfit}% of total (total × ${projectProfit / 100})
8. Notes: Safety considerations or special instructions

## Response Requirements
1. Strictly valid JSON text format (NO MARKDOWN OR BACKTICKS)
2. Maintain this structure:
{
  "phases": [
    {
      "phaseName": "Phase Name",
      "color": "#HEXCODE",
      "lineItems": [
        { 
          "title": "Item Name",
          "description": "Detailed description",
          "unit": "measurement",
          "quantity": 123,
          "unit_price": 12.34,
          "total": 1516.42,
          "margin": 151.64,
          "notes": "Special considerations"
        }
      ]
    }
  ]
}

3. Error response format:
{ "error": "invalid project description" }

## Calculation Examples
For ${projectSize} project:
- 200 sq.ft concrete slab @ $5/sq.ft = 200 × 5 = $1000 total
- ${projectProfit}% margin = 1000 × ${projectProfit / 100} = $${
    projectProfit * 10
  }

## Final Checks
1. Validate all numerical calculations
2. Ensure construction-specific terminology
3. Verify JSON syntax before responding
4. Re-check project relevance

PROCESSING PROJECT: "${projectDescription}"
`;
};

function GenerativeAiDialogue({ closeGenAiDialogue, projectId, fetchData }) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectSize, setProjectSize] = useState("");
  const [projectProfit, setProjectProfit] = useState("");
  const [generateWithAI] = useProjectGenAIMutation();
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEN_AI_KEY);
  const handleSetProjectSize = (e) => {
    setProjectSize(e.target.value);
  };
  const handleSetProjectProfit = (e) => {
    setProjectProfit(e.target.value);
  };
  const handleSetAiPrompt = (e) => {
    setAiPrompt(e.target.value);
  };
  const handleClickClose = () => {
    closeGenAiDialogue();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      if (!aiPrompt) {
        toast.error("Please enter a project description");
        setIsGenerating(false);
        return;
      }
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" });
      const userPrompt = createConstructionPrompt(aiPrompt, projectSize, projectProfit);
      const result = await model.generateContent([userPrompt]);
      const response = await result.response;
      const text = await response.text();
      const cleanedText = text
      .replace(/```json|```/g, "") // Remove code block markers
      .replace(/'/g, '"')         // Replace single quotes with double quotes
      .replace(/`/g, "")          // Remove backticks
      .trim();                    // Remove any extra whitespace or newlines
      const genAIResponse = JSON.parse(cleanedText);
      const phases = genAIResponse.phases || genAIResponse.error;
      const data = { phases, projectId };
      const responseAi = await generateWithAI(data);
      if (responseAi?.error) {
        toast.error(responseAi?.error?.data.message);
      } else {
        toast.success(responseAi?.data?.message);
      }
      setIsGenerating(false);
      await fetchData();
      handleClickClose();
    } catch (err) {
      console.log(err);
      toast.error("Api is exasted please try again later!");
      setIsGenerating(false);
    }
  };

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
                width: "calc(100% - 16px)",
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
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack alignItems={"start"} justifyContent={"flex-start"}>
                <Typography sx={typoText}>Project Size</Typography>
                <TextField
                  inputProps={{ maxLength: 150 }}
                  sx={{
                    ...inputStyle,
                    width: "calc(100% - 24px)",
                    alignSelf: "start",
                  }}
                  margin="dense"
                  id="projectSize"
                  name="projectSize"
                  placeholder={"50 Sq. Yds"}
                  // label="Email Address"
                  type="text"
                  variant="standard"
                  value={projectSize}
                  onChange={handleSetProjectSize}
                />
              </Stack>
              <Stack>
                <Typography sx={typoText}>Project Profit</Typography>
                <TextField
                  inputProps={{ maxLength: 150 }}
                  sx={{
                    ...inputStyle,
                    width: "calc(100% - 16px)",
                    alignSelf: "start",
                  }}
                  margin="dense"
                  id="projectProfit"
                  name="projectProfit"
                  placeholder={"25%"}
                  // label="Email Address"
                  type="text"
                  variant="standard"
                  value={projectProfit}
                  onChange={handleSetProjectProfit}
                />
              </Stack>
            </Stack>
            <Typography sx={typoText}>
              Provide a detailed description of your project to generate a
              suggested breakdown of phases and associated line items using AI.
              Processing may take up to 30 seconds.
            </Typography>
            <Typography sx={{ ...typoText, color: "red", fontSize: "14px" }}>
              Warning: This will rewrite your previously saved phases and line
              Items.
            </Typography>
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
              {isGenerating ? (
                <>
                  <img src={loader} alt="loading gif" width={"50px"}></img>
                </>
              ) : (
                "Generate"
              )}
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
  alignItems: "center",
  gap: 2,
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
