import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import CloseIcon from "@mui/icons-material/Close";

const LineItemDetailModal = ({ modalOpen, setModalOpen, lineItem }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack>
          <Typography variant="h5" component="h2" gutterBottom>
            {lineItem?.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {lineItem?.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Unit:</strong> {lineItem?.unit}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Quantity:</strong> {lineItem?.quantity}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Unit Price:</strong> {lineItem?.unit_price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Total:</strong> {lineItem?.total}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Start Day:</strong>{" "}
            {new Date(lineItem?.start_day).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>End Day:</strong>{" "}
            {new Date(lineItem?.end_day).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Notes:</strong> {lineItem?.notes}
          </Typography>
          <Stack bgcolor={"aliceblue"} width={"100px"} alignSelf={"right"}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              Icon={CloseIcon}
              handleOnClick={handleClose}
              marginLeft={"0px"}
            >
              Close
            </BuilderProButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "80%",
  bgcolor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};

export default LineItemDetailModal;
