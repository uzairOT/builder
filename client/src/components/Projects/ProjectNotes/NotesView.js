import { Paper, Stack } from "@mui/material";
import React from "react";
import TaskCalenderView from "../../Dashboard/TaskCalenderView/TaskCalenderView";
import Notes from "./Notes";

const NotesView = () => {
  return (
    <Stack direction={{xl: 'row', lg:'column'}} pt={1} spacing={1} height={'100%'}>
        <Stack flex={3}>
          <Notes />
        </Stack>
        <Stack  flex={1}>
      <Paper sx={{height: {xl:'94.5%', lg:'98%', borderRadius:'14px'}}}>
          <TaskCalenderView />
      </Paper>
          </Stack>
    </Stack>
  );
};

export default NotesView;
