import { Paper, Stack } from "@mui/material";
import React from "react";
import TaskCalenderView from "../../Dashboard/TaskCalenderView/TaskCalenderView";
import Notes from "./Notes";

const NotesView = () => {
  return (
    <Stack direction={"row"} pt={1} spacing={1} height={'100%'}>
        <Stack flex={3}>
        
          <Notes />
  
        </Stack>
        <Stack  flex={1}>
      <Paper sx={{height: '91.5%'}}>
          <TaskCalenderView />
      </Paper>
          </Stack>
    </Stack>
  );
};

export default NotesView;
