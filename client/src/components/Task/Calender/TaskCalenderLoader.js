import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const TaskCalenderLoader = () => {
  return (
    <>
    <Stack height={'83vh'} overflow={'hidden'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1} pl={1} pr={0} pb={0}>
        <Skeleton variant="circular" width={25} height={25}></Skeleton>
        <Skeleton  variant="rectangle" width={"90%"} height={"50px"}></Skeleton>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}  pl={1} pr={0}>
        <Stack direction={'row'} gap={1} alignItems={'center'} p={1}>
        <Skeleton variant="circular" width={25} height={25}></Skeleton>
        <Skeleton  variant="rectangle" width={"100px"} height={"50px"}></Skeleton>
        <Skeleton variant="circular" width={25} height={25}></Skeleton>
        </Stack>
        <Stack pr={1}>
        <Skeleton  variant="rectangle" width={"100px"} height={"50px"}></Skeleton>
        </Stack>
        </Stack>
        <Stack gap={0.5} p={0.5}>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
        <Skeleton  variant="rectangle" width={"100%"} height={"50px"}></Skeleton>
       

        </Stack>
    </Stack>
    </>
  )
}

export default TaskCalenderLoader
