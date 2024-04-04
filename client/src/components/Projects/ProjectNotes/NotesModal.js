import { Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import ImageIcon from "@mui/icons-material/Image";
import CreateIcon from "@mui/icons-material/Create";
import LinkIcon from "@mui/icons-material/Link";
import { useParams } from "react-router-dom";
import {
  useAddProjectNotesMutation,
  useEditProjectNotesMutation,
  useGetProjectNotesQuery,
} from "../../../redux/apis/Project/projectApiSlice";

const NotesModal = ({ showEditModal, setShowEditModal, notes}) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  console.log(notes);
  const [noteSubject, setNoteSubject] = useState(notes ? notes?.subject : "");
  const [noteBody, setNoteBody] = useState(notes? notes?.content : "");
  const [addProjectNote] = useAddProjectNotesMutation();
  const [editProjectNotes] = useEditProjectNotesMutation();
  const { refetch } = useGetProjectNotesQuery({ projectId: id });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (showEditModal) {
      setShowEditModal(!showEditModal);
    }
  };
  const handleNoteSubject = (e) => {
    setNoteSubject(e.target.value);
  };
  const handleNoteBody = (e) => {
    setNoteBody(e.target.value);
  };
 


  const handleSubmit = async () => {
    const noteId = notes?.id;
    const form = {
      subject: noteSubject,
      content: noteBody,
      projectId: id,
      noteId: noteId
    };
  
    if (showEditModal) {
        console.log(noteId);
        const res = await editProjectNotes(form).unwrap();
        console.log("Success:", res);
        await refetch();
    } else {
      try {
        const res = await addProjectNote(form).unwrap();
        console.log("Success:", res);
        await refetch(); // Refetch after adding notes
        // setOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
      {!showEditModal && (
        <BuilderProButton
          variant={"contained"}
          backgroundColor={"#4C8AB1"}
          fontSize={"11px"}
          fontFamily={"Inter, sans serif"}
          handleOnClick={handleOpen}
        >
          Add Notes
        </BuilderProButton>
      )}
      <Modal open={showEditModal ? showEditModal : open} onClose={handleClose}>
        <Stack sx={style}>
          <Typography
            fontFamily={"inherit"}
            fontSize={"24px"}
            fontWeight={"500"}
          >
            {showEditModal ? "Edit" : "Add"} Notes
          </Typography>
          <Stack spacing={2}>
            <Input
              variant="soft"
              value={noteSubject}
              onChange={handleNoteSubject}
              placeholder="Type Note Subject..."
            />
            <Textarea
              minRows={8}
              value={noteBody}
              onChange={handleNoteBody}
              variant="soft"
              placeholder="Type your text here..."
            />
          </Stack>
          <Stack
            direction={"row"}
            pt={6}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={1}>
              <FormatColorTextIcon style={{ color: "#4C8AB1" }} />
              <EmojiEmotionsOutlinedIcon style={{ color: "#4C8AB1" }} />
              <AddToDriveIcon style={{ color: "#4C8AB1" }} />
              <Stack>
                <label htmlFor="file-input">
                  <ImageIcon style={{ color: "#4C8AB1" }} />
                </label>
                <input id="file-input" type="file" style={{display:'none'}} />
              </Stack>
              <CreateIcon style={{ color: "#4C8AB1" }} />
              <LinkIcon
                style={{ transform: "rotate(135deg)", color: "#4C8AB1" }}
              />
            </Stack>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#4C8AB1"}
              fontSize={"11px"}
              fontFamily={"Inter, sans serif"}
              handleOnClick={handleSubmit}
            >
              Add Notes
            </BuilderProButton>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default NotesModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "14px",
};
