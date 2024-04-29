import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import pdf from './assets/images/pdf.png';
import p from './assets/images/imagepng.png';
import deletebtn from './assets/images/delete.png';
import download from './assets/images/download.png';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import NotesModal from "./NotesModal";
import { useParams } from "react-router-dom";
import { useDeleteProjectNotesMutation, useGetProjectNotesQuery } from "../../../redux/apis/Project/projectApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OpenNotes = ({ notes }) => {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor:"#D7D7D7",
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: '#00B65E',
        },
        width: '100%'
      }));
      const [showEditModal, setShowEditModal] = useState(false);
      const { id } = useParams();
      const [deleteProjectNote] = useDeleteProjectNotesMutation();
      const noteId = notes?.id;
      const { refetch } = useGetProjectNotesQuery({ projectId: id });
      const handleEdit = ()=>{
        setShowEditModal(!showEditModal)
      }
      const handleDelete = async ()=>{
        if(noteId === undefined){
          toast.warning('No notes selected');
      return;
        }
        await deleteProjectNote(noteId); 
        await refetch();
      }
  return (
    <Stack height={'100%'}>
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
          {showEditModal && <NotesModal notes={notes} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />}
        </Stack>
        <BuilderProButton backgroundColor={'#4C8AB1'} variant={'contained'}>
            <Typography fontFamily={'Manrope, sanserif'} fontWeight={'700'} fontSize={'13px'} pl={2} pr={2}>Save</Typography>
        </BuilderProButton>
      </Stack>
      <Stack p={4} justifyContent={"space-between"} height={'100%'}>
        <Stack>
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
            pt={4}
          >
            {notes?.content}
          </Typography>
        </Stack>
        {/* <Stack spacing={1}>
              <Stack direction={'row'}  p={1} backgroundColor={'#F1F1F1'} width={'300px'} borderRadius={'10px'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <img src={pdf} alt="PDF icon" style={{width:'28px', height:'28px'}}></img>
                    <Stack>
                        <Typography
                        textAlign={"left"}
                        fontSize={"14px"}
                        fontWeight={"500"}
                        color={"#324054"}
                        fontFamily={"Inter, sans serif"}
                        >File Title.pdf</Typography>
                        <Typography
                        textAlign={"left"}
                        fontSize={"12px"}
                        fontWeight={"500"}
                        color={"#71839B"}
                        fontFamily={"Inter, sans serif"}
                        >313 KB . 31Aug, 2022</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <img src={download} alt="PDF icon" style={{width:'15px', height:'15px',color:'#71839B'}}></img>
                <img src={deletebtn} alt="delete icon" style={{width:'15px', height:'15px',color:'#F92828'}}></img>
                </Stack>
              </Stack>
              <Stack direction={'row'}  p={1} backgroundColor={'#F1F1F1'} width={'300px'} borderRadius={'10px'}>
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
              </Stack>
        </Stack> */}
      </Stack>
    </Stack>
  );
};

export default OpenNotes;
