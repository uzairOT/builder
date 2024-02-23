import { Stack, Typography } from '@mui/material'
import React from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton'
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchBar from '../../UI/SearchBar/SearchBar';

const ProjectList = () => {
  return (
    <Stack>
        {/* Project List Header */}
        <Stack p={3}>
            {/* Project List Title */}
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack pl={8}>
                    <Typography color={'#4C8AB1'} fontFamily={'Poppins, san serif'} fontSize={'22px'} fontWeight={'600'}>Project List</Typography>
                    <Typography color={'#4C8AB1'} fontFamily={'Poppins, san serif'} fontSize={'14px'} fontWeight={'400'}>All projects are displayed here</Typography>
                </Stack>
                {/* Buttons Remodel And Filter */}
                <Stack direction={'row'} height={'35px'}>
                    <BuilderProButton variant={'contained'} backgroundColor={'#E7E7E7'} Icon={CloseIcon} iconProps={{color:'#272727'}}>
                        <Typography color={'#272727'} fontFamily={'Inter, sans serif'} fontSize={'12px'} fontWeight={'500'}>Remodel</Typography>
                    </BuilderProButton>
                    <BuilderProButton variant={'contained'} backgroundColor={'#FFAC00'} Icon={FilterListIcon} fontFamily={'inherit'} fontSize={'12px'} >
                    Filter
                        </BuilderProButton>
                </Stack>
            </Stack>
            <Stack alignSelf={'flex-end'} direction={'row'}>
                <SearchBar />
                <Stack width={'150px'} justifyContent={'center'}>
                <BuilderProButton variant={'contained'} backgroundColor={'#FFAC00'}fontFamily={'inherit'} fontSize={'12px'} marginLeft={0}>
                    Add New
                </BuilderProButton>
                </Stack>
            </Stack>

        </Stack>
    </Stack>
  )
}

export default ProjectList