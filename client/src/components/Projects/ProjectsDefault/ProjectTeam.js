import { Stack, Typography } from '@mui/material'
import React from 'react'
import data from './assests/data/data.json'


    const ProjectTeam = () => {
        // Grouping data by role
        const groupedData = data.reduce((acc, person) => {
          acc[person.role] = acc[person.role] || [];
          acc[person.role].push(person);
          return acc;
        }, {});
  
        console.log(groupedData);
  return (
    <Stack pl={5} >
        <Typography sx={themeStyle.title}>Project Team</Typography>
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack  width={'100%'}>
            {Object.keys(groupedData).map((role)=>{
                let acc =0;
                return(
                <Stack direction={'row'} justifyContent={'space-between'} >
                <Stack direction={'row'}  width={'100%'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.subTitle}>{role}</Typography>
                <Stack direction={'row'} width={'190px'}>

                {groupedData[role].map((person, index)=>{
                    if (index > 1){
                        acc++;
                        return(
                            <Typography sx={{...themeStyle.subTitle}} style={{color: '#636363'}} position={'relative'} top={'-2px'} pl={0.5}>+{acc}</Typography>
                      )
                    }else{
                        return(
                      <Typography sx={themeStyle.subTitle}>{person.name}{groupedData[role].length > 1 && index === 0 ? ',' :''}</Typography>
                    )}
                })}
                </Stack>
                </Stack>
                <Stack direction={'row'} width={'100px'}>
                {groupedData[role].map((person, index)=>{
                    return(
                        <img src={person.profilePic} alt='/' width={'35px'} height={'35px'} style={{borderRadius:'50px', marginLeft: '-10px'}} ></img>
                        )
                    })}
                </Stack>
                </Stack>
                )})
            }
            </Stack>
        </Stack>
    </Stack>
  )
}

export default ProjectTeam;

const themeStyle ={
    title: {
        fontSize: '16px',
        color: '#4C8AB1',
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        
    },
    subTitle: {
        fontSize: '13px',
        color: '#202227',
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        textAlign: 'left'
    }
}