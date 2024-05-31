import {
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  useAddProjectNotesMutation,
  useEditProjectNotesMutation,
  useGetProjectNotesQuery,
} from "../../../redux/apis/Project/projectApiSlice";
import { toast } from "react-toastify";
import { uploadToS3 } from "../../../utils/S3";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { fileTypeIcons } from "../../dialogues/AddImage/assets/fileTypes";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
//import "react-toastify/dist/ReactToastify.css";

const NotesModal = ({ showEditModal, setShowEditModal, notes }) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  //console.log(notes);
  const [noteSubject, setNoteSubject] = useState(notes ? notes?.subject : "");
  const [noteBody, setNoteBody] = useState(notes ? notes?.content : "");
  // const [fileName, setFileName] = useState("");
  // const [fileType, setFileType] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [images, setImages] = useState(notes ? notes.files : []);
  const [isLoading, setIsLoading] = useState(false);

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

  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post(
          "http://192.168.0.112:8080/project/file",
          {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        );
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const noteId = notes?.id;
    if (noteId === undefined && showEditModal) {
      toast.warning("No notes selected");
      return;
    }
    if (noteBody === "" || noteSubject === "") {
      toast.warning("Cannot send empty fields!");
      return;
    }
    const promises = [];
    const urlArray = [];

    // The image array is being iterated to create promises
    for (const image of images) {
      // Here we are checking to see if the image is an object which then is uploaded to S3 to generate a url
      if (image.name) {
        promises.push(
          uploadFileToServer(image).then((fileUrl) =>
            uploadToS3(fileUrl, image)
          )
        );
      } else {
        //The images/files that are not an object(meaning they are AWS S3 urls) are pushed into a the urlArray
        urlArray.push(image);
      }
    }
    await Promise.all(promises).then((uploadFileToServer) => {
      urlArray.push(...uploadFileToServer);
    });
    console.log(promises);
    console.log(urlArray);
    const form = {
      subject: noteSubject,
      content: noteBody,
      projectId: id,
      noteId: noteId,
      files: urlArray,
    };
    console.log(form);
    if (showEditModal) {
      //console.log(noteId);
      const res = await editProjectNotes(form).unwrap();
      //console.log("Success:", res);
      await refetch();
    } else {
      try {
        const res = await addProjectNote(form).unwrap();
        //console.log("Success:", res);
        await refetch(); // Refetch after adding notes
        // setOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setNoteSubject("");
    setNoteBody("");
    setImages([]);
    setIsLoading(false);
  };
  const handleImageUpload = (e) => {
    const selectedFiles = e.target.files;

    // Check if any files are selected
    if (!selectedFiles.length) return;

    const validImages = [];
    const fileSizeLimit = 25 * 1024 * 1024;

    // Loop through selected files
    for (const file of selectedFiles) {
      if (file.size > fileSizeLimit) {
        toast.warning("Please upload file size less than 25mb.");
        continue; // Skip to the next file if size limit exceeded
      }
      validImages.push(file);
    }

    // Update state with valid images
    setImages([...images, ...validImages]); // Add new images to existing ones
  };
  const handleRemoveFile = (index) => {
    const imagesCopy = [...images];
    imagesCopy.splice(index, 1);
    setImages(imagesCopy);
  };
  useEffect(() => {
    console.log(images);
  }, [images]);

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
          <Stack
            pb={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={"inherit"}
              fontSize={"24px"}
              fontWeight={"500"}
            >
              {showEditModal ? "Edit" : "Add"} Notes
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize={"small"} />
            </IconButton>
          </Stack>
          <Stack spacing={2}>
            <Input
              variant="soft"
              value={noteSubject}
              onChange={handleNoteSubject}
              placeholder="Type Note Subject..."
            />
            <Textarea
              minRows={8}
              maxRows={8}
              value={noteBody}
              onChange={handleNoteBody}
              variant="soft"
              placeholder="Type your text here..."
            />
          </Stack>
          <Stack
            direction={"row"}
            width={"300px"}
            style={{ overflowX: "scroll" }}
          >
            {images?.map((image, index) => {
              const fileType = showEditModal
                ? image.name
                  ? image.name.split(".").pop().toLowerCase()
                  : image.split(".").pop().toLowerCase()
                : image.name.split(".").pop().toLowerCase();
              const isImage = [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "svg",
                "webp",
              ].includes(fileType);
              return (
                <Stack>
                  <IconButton
                    onClick={() => handleRemoveFile(index)}
                    style={{
                      position: "relative",
                      left: "5px",
                      top: "20px",
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <CancelRoundedIcon color="disabled" />
                  </IconButton>
                  {isImage ? (
                    <img
                      key={index}
                      src={
                        showEditModal
                          ? image.name
                            ? URL.createObjectURL(image)
                            : image
                          : URL.createObjectURL(image)
                      }
                      alt={`Uploaded ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "scale-down",
                        margin: "1px",
                        border: "1px solid black",
                      }}
                    />
                  ) : fileTypeIcons.has(fileType) ? (
                    <img
                      key={index}
                      src={fileTypeIcons.get(fileType)}
                      alt={`Uploaded ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "scale-down",
                        margin: "1px",
                        border: "1px solid black",
                      }}
                    />
                  ) : (
                    <>no preview</>
                  )}
                </Stack>
              );
            })}
          </Stack>
          <Stack
            direction={"row"}
            pt={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={0}>
              {/* <FormatColorTextIcon style={{ color: "#4C8AB1" }} /> */}
              {/* <EmojiEmotionsOutlinedIcon style={{ color: "#4C8AB1" }} /> */}
              {/* <AddToDriveIcon style={{ color: "#4C8AB1" }} /> */}
              <Stack>
                <label htmlFor="file-input">
                  <AttachFileIcon
                    style={{ color: "#4C8AB1", cursor: "pointer" }}
                  />
                </label>
                <input
                  multiple
                  id="file-input"
                  type="file"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Stack>
              {/* <CreateIcon style={{ color: "#4C8AB1" }} /> */}
              {/* <LinkIcon
                style={{ transform: "rotate(135deg)", color: "#4C8AB1" }}
              /> */}
            </Stack>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#4C8AB1"}
              fontSize={"11px"}
              fontFamily={"Inter, sans serif"}
              handleOnClick={handleSubmit}
            >
              {isLoading ? <CircularProgress size={"18px"} /> : "Add Notes"}
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
