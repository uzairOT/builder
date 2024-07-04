import {
  Typography,
  useTheme,
  Button,
  Box,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";

import React from "react";
import "../../../App.css";
import { useGetWorkOrdersLineItemsProgressMutation } from "../../../redux/apis/Reports/reportsApiSlice";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectCard() {
  const { id } = useParams();
  const [projectName, projectLocation] = useOutletContext();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.user?.id;
  const projectId = id;
  const [getStatus, { data }] = useGetWorkOrdersLineItemsProgressMutation();
  const fetchStats = async () => {
    try {
      const result = await getStatus({
        userId,
        projectId,
      }).unwrap();
      // setProjects(result);
      console.log(
        "Success useGetTotalProjectProfitMarginMutation Results Results Results:",
        result
      );
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [id]);
  const totalCompletedLineItems = data?.totalCompletedLineItems;
  const totalLineItems = data?.totalLineItems;
  const activeWorkOrders = data?.workOrders;
  const percentage = Math.round((totalCompletedLineItems / totalLineItems) * 100);
  console.log(percentage);



  // Define your data

  return (
    <div style={{display: 'flex', flexDirection:'column', height:'306px'}}>
      <Typography sx={themeStyle.heading}>Project</Typography>
      <Typography sx={themeStyle.descriptionText}>Project Name: {projectName}</Typography>
      <Typography sx={themeStyle.descriptionText}>Project Location: {projectLocation}</Typography>

      {/* 
            {data1.map((item, index) => (
                <Box key={index} sx={themeStyle.box}>
                    <Typography sx={themeStyle.descriptionText}>
                        {`${item.title1} ${item.description1}`}
                    </Typography>
                    <Typography sx={themeStyle.descriptionText}>
                        {`${item.title2} ${item.description2}`}
                    </Typography>
                </Box>
            ))} */}

      <Box sx={{ ...themeStyle.box, marginTop: "1.5rem" }}>
        <Typography sx={themeStyle.listItem}>Start</Typography>
        <Typography sx={{ ...themeStyle.listItem, marginRight: "3rem" }}>
          End
        </Typography>
      </Box>
      <Box sx={{ ...themeStyle.box, marginBottom: "1.3rem" }}>
        <LinearProgress
          determinate
          variant="outlined"
          size="sm"
          thickness={24}
          value={isNaN(percentage) ? 0 : percentage}
          sx={{
            "--LinearProgress-radius": "20px",
            "--LinearProgress-thickness": "15px",
          }}
        ></LinearProgress>
        <Typography sx={{ ...themeStyle.listItem }}>
          {" "}
          {totalCompletedLineItems}/{totalLineItems}
        </Typography>
      </Box>

          <Typography sx={themeStyle.descriptionText} pb={1}>Active workorders:</Typography>
          <Stack justifyContent={'center'} pl={2} pr={2}>
      {activeWorkOrders?.map((workOrder) => {
          return (
              <>
            <Stack direction={"row"} justifyContent={"space-between"} width={'100%'}>
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
    </Stack>
    </div>
  );
}

const themeStyle = {
  heading: {
    color: "#4C8AB1",
    fontFamily: "Arial Rounded MT, sans-serif",
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  descriptionText: {
    color: "#202227",
    fontFamily: "Arial Rounded MT, sans-serif",
    padding: "0rem 1rem",
  },
  box: {
    display: "flex",
    marginTop: "0.3rem",
    justifyContent: "space-between",
  },
  evenBox: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  listItem: {
    color: "#2F2F2F",
    fontSize: "0.7rem",
    fontFamily: "Arial Rounded MT, sans-serif",
    opacity: "70%",
    paddingLeft: "1rem",
    fontWeight: 300,
  },
  costText: {
    color: "#4C8AB1",
    fontFamily: "Arial Rounded MT, sans-serif",
    fontSize: "0.7rem",
    marginRight: "1rem",
    fontWeight: 600,
  },
  AvatarStyle: {
    width: 30,
    height: 30,
    ml: "-10px",
    mt: 1,
  },
  text: {
    fontFamily: "Arial Rounded MT, sans-serif",
    fontSize: "14px",
    width: "160px",
    color: "#202227",
  },
};

export default ProjectCard;
