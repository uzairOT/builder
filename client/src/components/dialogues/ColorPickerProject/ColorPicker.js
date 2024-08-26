import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import actionButton from "../../UI/actionButton";
import {
  HexColorPicker,
  RgbaColorPicker,
  RgbaStringColorPicker,
  HexColorInput,
} from "react-colorful";
import { useDispatch } from "react-redux";
import { setProjectColor } from "../../../redux/slices/projectFormSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: {sm:"50%",xs:"40%"},
  transform: {sm:"translate(-50%, -50%)", xs:"translate(-50%, -50%)"},
  width: { sm: 400, xs: 250 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius:{sm:"0px", xs:"20px"},
  boxShadow: 24,
  p: { sm: 4, xs: 1 },
};

const styles = {
  link: {
    cursor: "pointer",
    // textDecoration: "underline",
    "&:hover": {
      color: "#326273", // Change color on hover
    },
    "&:focus": {
      outline: "none", // Remove outline on focus
      color: "#326273", // Change color on focus
    },
  },
};
export default function ColorPicker({ editModal, handleProjectColorChange }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [colorMode, setColorMode] = React.useState("");
  const [color, setColor] = React.useState("");
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "rgba" ? "hex" : "rgba"));
  };
  const dispatch = useDispatch();

  const handleChangeColor = () => {
    if (editModal) {
      handleProjectColorChange(color);
      handleClose();
      setColor("");
    } else {
      dispatch(setProjectColor(color));
      setColor("");
      handleClose();
    }
  };
  React.useEffect(() => {
    //console.log(color);
  }, [color]);

  return (
    <div>
      <Typography onClick={handleOpen} color={"#4C8AB1"} sx={styles.link}>
        Tap to Select Color
      </Typography>

      <Modal
        sx={{ width: { sm: "100%", xs: 250 }, left: { sm: 0, xs: "20%" } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={typoText}>Select Color</Typography>
          <div
            className="custom-pointers example"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {colorMode === "rgba" ? ( // Render RGBA color picker if colorMode is 'rgba'
              <Box sx={generalBox}>
                <RgbaStringColorPicker
                  sx={{ gap: "0.5rem", ...generalBox }}
                  color={color}
                  onChange={setColor}
                />
              </Box>
            ) : (
              <Box sx={generalBox}>
                <HexColorPicker color={color} onChange={setColor} />
              </Box>
            )}

            <Box sx={{ ...generalBox, ...inputColorBox }}>
              <HexColorInput
                style={{ width: "60%" }}
                color={color}
                onChange={setColor}
              />
              <Box sx={{ ...colorBox, background: color }} />
            </Box>
            <Box sx={generalBox} onClick={toggleColorMode}>
              <Typography sx={{ ...typoText, cursor: "pointer" }}>
                {colorMode === "rgba" ? "RGBA" : "HEX"}
              </Typography>
            </Box>
            <br />
            <Button
              sx={{ ...actionButton, ...addPhaseButton, alignSelf: "center" }}
              type="submit"
              onClick={handleChangeColor}
            >
              Done
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const addPhaseButton = {
  height: "70%",
  width: "9rem",
  textAlign: "center",
};

const typoText = {
  fontFamily: 'var(--main-font-family)',
  fontSize: "1rem",
  color: "#202227",
  textAlign: "center",
  fontWeight: "600",
};
const generalBox = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};
const inputColorBox = {
  gap: "0.3rem",
  marginTop: "0.2rem",
};
const colorBox = {
  height: "2rem",
  width: "2rem",
};
