import React from "react";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Stack from "@mui/joy/Stack";
import { Typography } from "@mui/material";

const VerticalTabs = ({ notes, handleSelectedButton , selectedButton}) => {
  return (
    <Stack direction={"column"} height={"100%"} p={1}>
      <ButtonGroup orientation="vertical" variant="plan" >
        {notes.map((note, index) => {
          return (
            <Button key={index} style={{borderRadius: '7px',}} sx={{ width: "100%", height: "100%", paddingLeft:'32px', '--ButtonGroup-separatorColor': 'white', backgroundColor: selectedButton === index ? '#EBF3F8' : '', }} onClick={()=>{handleSelectedButton(index)}}>
              <Stack width={"100%"}>
                <Typography textAlign={"left"} fontSize={'16px'} fontWeight={'700'} color={'#202227'}>{note.title}</Typography>
                <Typography
                 fontSize={'12px'}
                 fontWeight={'200'}
                 color={'#202227'}
                  textAlign={"left"}
                  width={"200px"}
                  textOverflow={"ellipsis"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                >
                  {note.note}
                </Typography>
                <Typography 
                 fontSize={'12px'}
                 fontWeight={'200'}
                 color={'#202227'}
                textAlign={"left"}>{note.date}</Typography>
              </Stack>
            </Button>
          );
        })}
      </ButtonGroup>
    </Stack>
  );
};

export default VerticalTabs;
