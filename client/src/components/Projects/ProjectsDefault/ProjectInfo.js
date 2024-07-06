import { Avatar, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { AvTimer } from "@mui/icons-material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#4C8AB1" : "#4C8AB1",
  },
  width: "60%",
}));

const ProjectInfo = ({ data }) => {
  console.log(data);
  const totalCompletedLineItems = data?.totalCompletedLineItems;
  const totalLineItems = data?.totalLineItems;
  const activeWorkOrders = data?.workOrders;
  const percentage = Math.round((parseInt(totalCompletedLineItems) / parseInt(totalLineItems)) * 100);
  console.log(percentage)
  return (
    <Stack height={"205px"}>
      <Typography sx={themeStyle.title}>Burrow - Home Build</Typography>
      <Stack direction={"row"} width={"60%"} justifyContent={"space-between"}>
        <Typography sx={themeStyle.label} >
          Start
        </Typography>
        <Typography sx={themeStyle.label} >
          End
        </Typography>
      </Stack>
      <Stack direction={"row"} pt={1}>
        <BorderLinearProgress variant="determinate" value={percentage} />
        <Typography sx={themeStyle.label} pl={1}>
          {totalCompletedLineItems}/{totalLineItems}
        </Typography>
      </Stack>
      <Stack spacing={0.5} pt={1} pb={1.2} width={"100%"}>
        {activeWorkOrders?.map((workOrder) => {
          return (
            <>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"}>
                  {workOrder?.team?.map((user, index) => {
                    return (
                      <Avatar
                        key={index}
                        sx={themeStyle.AvatarStyle}
                        src={user.image}
                      />
                    );
                  })}
                </Stack>
                <Stack width={"55%"} alignSelf={"center"}>
                  <Divider
                    variant="middle"
                    orientation="horizontal"
                    style={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      color: "#C5C5C5",
                    }}
                  />
                </Stack>
                <Typography sx={themeStyle.text}>
                  {workOrder.description}
                </Typography>
              </Stack>
            </>
          );
        })}

        {/* <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Remodel Type</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Sales Rep</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Project Manager</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack>
             <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={themeStyle.text}>Job Status</Typography>
                <Stack width={'55%'} alignSelf={'center'}>
                <Divider  variant='middle' orientation="horizontal" style={{borderStyle:'dashed', borderWidth: '1px', color:'#C5C5C5'}}  />
                </Stack>
                <Typography sx={themeStyle.text}>Job Type</Typography>
             </Stack> */}
      </Stack>
    </Stack>
  );
};

export default ProjectInfo;

const themeStyle = {
  title: {
    fontSize: "16px",
    color: "#4C8AB1",
    fontFamily: "Arial Rounded MT, sans-serif",
  },
  text: {
    fontFamily: "Arial Rounded MT, sans-serif",
    fontSize: "14px",
    width: "160px",
    color: "#202227",
  },
  label: {
    fontFamily: "Arial Rounded MT, sans-serif",
    color: "#202227",
    fontSize:{xl:"13px", lg:12, md:12, xs:"12px"}
  },
  AvatarStyle: {
    width: 30,
    height: 30,
    ml: "-10px",
    mt: 1,
  },
};
