import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton'
import SearchBar from '../../UI/SearchBar/SearchBar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import SelectMenuBarChart from '../../Reports/SelectMenuBarChart';
import VerticalTabs from './VerticalTabs';
import ButtonGroup from '@mui/joy/ButtonGroup';
import OpenNotes from './OpenNotes';

const Notes = () => {
    const [selectedButton, setSelectedButton] = useState(0);

    const list =[
        {"listItem": "All Notes"},
        {"listItem": "All Notes"},
        {"listItem": "All Notes"}
    ]
    const notes = [
        {
          "title": "ABEC Compeition",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "date": "20 Feb 2021",
        },
        {
          "title": "Project Kick-off Meeting",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "date": "25 Feb 2021",
        },
        {
          "title": "Site Inspection",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "date": "3 Mar 2021",
        },
        {
          "title": "Material Delivery",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "date": "10 Mar 2021",
        },
        {
          "title": "Progress Meeting",
          "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "date": "15 Mar 2021",
        },
      ];
      const handleSelectedButton = (index) =>{
        setSelectedButton(index);
        console.log("Slected Btn notes: ", index);
      }
      
  return (
    <Stack direction={'row'} spacing={1} height={'100%'}>
    <Stack flex={1}>
    <Paper sx={{height: '91.5%'}}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={2} >
        <Typography fontSize={'20px'} fontFamily={'Poppins, sans serif'} fontWeight={'600'} color={'#4C8AB1'}>Notes</Typography>
        <Stack direction={'row'} alignItems={'center'}>
            <BuilderProButton variant={'contained'} backgroundColor={'#4C8AB1'} fontSize={'11px'} fontFamily={'Inter, sans serif'}>Add Notes</BuilderProButton>
        </Stack>
      </Stack>
      <SearchBar />
      <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} p={2}>
        <EventNoteIcon style={{color:'#4C8AB1'}} />
        <SelectMenuBarChart listItems={list} color={'#4C8AB1'}/>
      </Stack>
       <VerticalTabs notes={notes} handleSelectedButton={handleSelectedButton} selectedButton={selectedButton}/>
    </Paper>
    </Stack>


        <Stack flex={2} >
         <Paper sx={{height: '91.5%'}}>
           <OpenNotes notes={notes[selectedButton]} />
        </Paper>
          </Stack>


    </Stack>
  )
}

export default Notes
