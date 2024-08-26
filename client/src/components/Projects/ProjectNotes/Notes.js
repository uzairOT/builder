import { Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton'
import SearchBar from '../../UI/SearchBar/SearchBar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import SelectMenuBarChart from '../../Reports/SelectMenuBarChart';
import VerticalTabs from './VerticalTabs';
import ButtonGroup from '@mui/joy/ButtonGroup';
import OpenNotes from './OpenNotes';
import NotesModal from './NotesModal';
import { useOutletContext, useParams } from "react-router-dom";
import { useGetProjectNotesQuery } from '../../../redux/apis/Project/projectApiSlice';
import  Search  from '../../UI/CustomSearchInput';
import QueryDebouncer from '../../../utils/QueryDebouncer/QueryDebouncer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { usePermissionCheck } from '../../Settings/PermissionAccess/PermissionCheck';

const Notes = () => {
    const [selectedButton, setSelectedButton] = useState(-1);
    const { id } = useParams();
    const [searchInput, setSearchInput] = useState('');
    const debouncedValue = QueryDebouncer(searchInput, 500)
    const { data, refetch } = useGetProjectNotesQuery({ projectId: id, q:debouncedValue ? debouncedValue : '' });
    const role = useSelector(state => state.userRole.userRole);
    const [projectName, projectLocation, SuperAdminId] = useOutletContext(); 
    // const canManageNotes = usePermissionCheck("manage-project-notes", role, SuperAdminId)
  
      const handleSelectedButton = (index) =>{
        setSelectedButton(index);
        //console.log("Slected Btn notes: ", index);
      }
      const handleSearchInputChange = (e) =>{
        setSearchInput(e.target.value);
      }
      const refetchNotes = async() => {
        await refetch({ projectId: id, q:debouncedValue ? debouncedValue : '' });
      }
      useEffect(()=>{
        refetchNotes()
      },[debouncedValue])
  return (
    <Stack direction={{xl:'row', lg:'row', md:'column-reverse'}} spacing={1} height={'100%'}>
    <Stack flex={1}>
    <Paper sx={{borderRadius:'14px', height:'99%'}} >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={2} >
        <Typography fontSize={{xl:'22px', lg:"18px",md:'22px',xs:'22px',}} fontFamily={'var(--main-font-family)'} fontWeight={'600'} color={'#4C8AB1'}>Notes</Typography>
        <Stack direction={'row'} alignItems={'center'}>
            <NotesModal q={debouncedValue}/>
        </Stack>
      </Stack>
      <Search
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder={`Search Notes`}
          backgroundColor="#E7E7E7"
        />
      <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} p={2}>
        {/* <EventNoteIcon style={{color:'#4C8AB1'}} /> */}
        {/* <SelectMenuBarChart listItems={list} color={'#4C8AB1'}/> */}
      </Stack>
       <VerticalTabs notes={data?.notes} handleSelectedButton={handleSelectedButton} selectedButton={selectedButton}/>
    </Paper>
    </Stack>


        <Stack flex={2}  >
         <Paper sx={{ borderRadius:'14px', height:'98.88%'}}>
           <OpenNotes  notes={data?.notes[selectedButton]} setSelectedButton={setSelectedButton} refetchNotes={refetchNotes}/>
        </Paper>
          </Stack>

    </Stack>
  )
}


export default Notes
