import React from "react";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Stack from "@mui/joy/Stack";
import { Typography } from "@mui/material";
import moment from "moment-timezone";

const VerticalTabs = ({ notes, handleSelectedButton , selectedButton}) => {
  return (
    <Stack direction={"column"}  p={1} sx={scrollable} height='calc(92vh - 235px)'>
      <ButtonGroup orientation="vertical" variant="plan" >
        {notes?.map((note, index) => {
          return (
            <Button key={note.id} style={{borderRadius: '7px', height:'100%'}} sx={{ width: "100%", height: "100%", paddingLeft:'32px', '--ButtonGroup-separatorColor': 'white', backgroundColor: selectedButton === index ? '#EBF3F8' : '', }} onClick={()=>{handleSelectedButton(index)}}>
              <Stack width={"100%"}  height={'100%'} >
                <Typography textAlign={"left"} fontSize={'16px'} fontWeight={'700'} color={'#202227'} height={'100%'}>{note?.subject}</Typography>
                <Typography
                 fontSize={'12px'}
                 fontWeight={'200'}
                 color={'#202227'}
                  textAlign={"left"}
                  width={"200px"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                  height={'100%'}
                >
                  {note?.content}
                </Typography>
                <Typography 
                height={'100%'}
                 fontSize={'12px'}
                 fontWeight={'200'}
                 color={'#202227'}
                textAlign={"left"}>{moment(note?.createdAt).format('MMM, D, YYYY HH:mm a')}</Typography>
              </Stack>
            </Button>
          );
        })}
      </ButtonGroup>
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

export default VerticalTabs;
