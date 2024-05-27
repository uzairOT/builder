import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useUpdateUserLineItemStatusMutation } from "../../../redux/apis/Project/projectApiSlice";
import { useSelector } from "react-redux";

const LineItemDetailModal = ({
  modalOpen,
  setModalOpen,
  lineItem,
  userRole,
  userId
}) => {

  const [updateStatus, { isLoading }] = useUpdateUserLineItemStatusMutation();
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleDone = async () => {
    try {
      const res = updateStatus({
        LineItem_id: lineItem.id,
        userId: userId,
        status: "done",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };
  console.log(lineItem)
  const disableButton = () => {
    const userStatus = lineItem?.UserLineItemStatuses?.find( user => user.userId === userId);
    if(userStatus?.status === 'done'){
      return true;
    }else{
      return false;
    }
  }
 
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
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              Icon={CloseIcon}
              handleOnClick={handleClose}
              marginLeft={"0px"}
            >
              Close
            </BuilderProButton>
            <Stack>
              {userRole === "employee" ? (
                <>
                  <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    Icon={CheckCircleOutlineIcon}
                    handleOnClick={handleDone}
                    marginLeft={"0px"}
                    disabled={isLoading || disableButton()}
                  >
                    Done
                  </BuilderProButton>
                </>
              ) : userRole === "subcontractor" ? (
                <>
                  <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    Icon={CheckCircleOutlineIcon}
                    handleOnClick={handleDone}
                    marginLeft={"0px"}
                    disabled={isLoading || disableButton()}
                  >
                    Done
                  </BuilderProButton>
                </>
              ) : userRole === "supplier" ? (
                <> <BuilderProButton
                backgroundColor={"#4C8AB1"}
                variant={"contained"}
                Icon={CheckCircleOutlineIcon}
                handleOnClick={handleDone}
                marginLeft={"0px"}
                disabled={isLoading || disableButton()}
              >
                Done
              </BuilderProButton></>
              ) : (
                <>
                 
                </>
              )}
            </Stack>
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
