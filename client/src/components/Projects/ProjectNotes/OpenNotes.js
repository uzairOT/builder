import { Box, Button, ButtonGroup, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import pdf from "./assets/images/pdf.png";
import p from "./assets/images/imagepng.png";
import deletebtn from "./assets/images/delete.png";
import download from "./assets/images/download.png";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import NotesModal from "./NotesModal";
import { useParams } from "react-router-dom";
import {
  useDeleteProjectNotesMutation,
  useGetProjectNotesQuery,
} from "../../../redux/apis/Project/projectApiSlice";
import { toast } from "react-toastify";
import { fileTypeIcons } from "../../dialogues/AddImage/assets/fileTypes";
import { handleDownload } from "../../../utils/S3";
//import "react-toastify/dist/ReactToastify.css";

const OpenNotes = ({ notes }) => {
  console.log(notes);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#D7D7D7",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#00B65E",
    },
    width: "100%",
  }));
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { id } = useParams();
  const [deleteProjectNote] = useDeleteProjectNotesMutation();
  const noteId = notes?.id;
  const { refetch } = useGetProjectNotesQuery({ projectId: id });
  const handleEdit = () => {
    setShowEditModal(!showEditModal);
  };
  const handleDelete = async () => {
    if (noteId === undefined) {
      toast.warning("No notes selected");
      return;
    }
    await deleteProjectNote(noteId);
    await refetch();
  };
  return (
    <Stack >
      <Stack direction={"row"} justifyContent={"space-between"} p={2}>
        <Stack
          direction={"row"}
          justifyContent={""}
          alignItems={"center"}
          spacing={6}
        >
          <ShareIcon style={{ color: "#3F3F3F" }} />
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              style={{
                backgroundColor: "#4C8AB133",
                borderRight: "0px",
                color: "#484848",
              }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
            <Button
              sx={{
                backgroundColor: "#4C8AB133",
                borderRight: "0px",
                color: "#484848",
              }}
              onClick={handleEdit}
            >
              <BorderColorIcon />
            </Button>
          </ButtonGroup>
          {showEditModal && (
            <NotesModal
              notes={notes}
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
            />
          )}
        </Stack>
        <BuilderProButton backgroundColor={"#4C8AB1"} variant={"contained"}>
          <Typography
            fontFamily={"Manrope, sanserif"}
            fontWeight={"700"}
            fontSize={"13px"}
            pl={2}
            pr={2}
          >
            Save
          </Typography>
        </BuilderProButton>
      </Stack>
      <Stack p={4} pt={2} justifyContent={"space-between"} height='calc(92vh - 165px)'>
        <Stack>
          <Typography
            textAlign={"right"}
            fontSize={"15px"}
            fontWeight={"500"}
            color={"#535353"}
            pt={0}
          >
            {notes?.files?.length ? `attachments ${notes?.files?.length}` : ''}
          </Typography>
          <Typography
            textAlign={"left"}
            fontSize={"24px"}
            fontWeight={"700"}
            color={"#202227"}
          >
            {notes?.subject}
          </Typography>
          <Typography
            textAlign={"left"}
            fontSize={"15px"}
            fontWeight={"500"}
            color={"#535353"}
            pt={2}
          >
            {notes?.content}
          </Typography>
        </Stack>
        <Box>
        <Box>
          <Typography>
          {notes?.files?.length ? 'attachments:' : ''}
          </Typography>
          </Box>
        <Grid container height='100px' spacing={0.5} p={'6px'} overflow={'hidden'} sx={scrollable}>
          {notes?.files?.map((file, index) => {
            const fileType = file?.split(".").pop().toLowerCase();
            const fileName = file?.split("/").pop().toLowerCase();
            const isImage = [
              "jpg",
              "jpeg",
              "png",
              "gif",
              "bmp",
              "svg",
              "webp"
            ].includes(fileType);
            return (
              <Grid item xl={4}    >
              <Stack
                direction={"row"}
                p={1}
                backgroundColor={"#F1F1F1"}
                
                height={'40px'}
                borderRadius={"10px"}
                justifyContent={"space-between"}
                style={{cursor:'pointer'}}
                onClick={() => { handleDownload(file, fileName, setIsDownloading)}}
              >
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  {isImage ? (
                    <img
                      src={file}
                      alt="notes file"
                      style={{ width: "28px", height: "28px", objectFit:'scale-down' }}
                    ></img>
                  ) : fileTypeIcons.has(fileType) ? (
                    <>
                      <img
                      src={fileTypeIcons.get(fileType)}
                      alt="notes file"
                      style={{ width: "28px", height: "28px" }}
                    ></img>
                    </>
                  ) : (
                    <></>
                  )}
                  <Stack>
                    <Typography
                      textAlign={"left"}
                      fontSize={"0.7rem"}
                      fontWeight={"500"}
                      color={"#324054"}
                      fontFamily={"Inter, sans serif"}
                      overflow={'hidden'}
                    >
                      
                      {fileName}
                    </Typography>
                    <Typography
                      textAlign={"left"}
                      fontSize={"12px"}
                      fontWeight={"500"}
                      color={"#71839B"}
                      fontFamily={"Inter, sans serif"}
                    >
                      
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                   <img
                    src={download}
                    alt="PDF icon"
                    style={{ width: "25px", height: "25px", color: "#71839B" }}
                  ></img>
                </Stack>
                
              </Stack>
              </Grid>
              
            );
          })}
          {/* <Stack direction={'row'}  p={1} backgroundColor={'#F1F1F1'} width={'300px'} borderRadius={'10px'}>
                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}    >
                <Stack direction={'row'} spacing={1} alignItems={'center'} width={'100%'} pr={2}>
                    <img src={p} alt="PNG icon" style={{width:'28px', height:'28px'}}></img>
                    <Stack width={'100%'}>
                        <Typography
                        textAlign={"left"}
                        fontSize={"14px"}
                        fontWeight={"500"}
                        color={"#324054"}
                        fontFamily={"Inter, sans serif"}
                        pb={1}
                        >File Title.png</Typography>
                        <BorderLinearProgress variant="determinate" value={45}/>
                        <Typography
                        textAlign={"left"}
                        fontSize={"12px"}
                        fontWeight={"500"}
                        color={"#71839B"}
                        fontFamily={"Inter, sans serif"}
                        >45% Complete</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'}>
                <CloseIcon style={{color:'#71839B', fontSize:'18px'}} />
                </Stack>
                </Stack>
              </Stack> */}
        </Grid>
        </Box>
      </Stack>
              <Stack alignItems={'flex-end'} justifyContent={'flex-end'} height={'20px'} p={0.5}>  <>{isDownloading && <CircularProgress size={'20px'} /> }</></Stack>
    </Stack>
  );
};

const scrollable = {
  scrollbarWidth: "none", // For Firefox
  "-ms-overflow-style": "none", // For IE and Edge
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
    transition: "background-color 0.3s",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "#ddd",
  },
  overflowY: "scroll",
};
export default OpenNotes;
