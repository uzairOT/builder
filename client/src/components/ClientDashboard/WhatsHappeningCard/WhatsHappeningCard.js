import { Typography, useTheme, Button, Box, Stack } from "@mui/material";
import React from "react";
import "../../../App.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTotalProjectProfitMarginMutation } from "../../../redux/apis/Reports/reportsApiSlice";
import { useEffect } from "react";
import { useState } from "react";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";

function WhatsHappeningCard() {
  const { id } = useParams();
  const [projectName, projectLocation] = useOutletContext();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user.id;
  const projectId = id;
  const [getProjectDeadlineStats, { data, error, isLoading }] =
    useGetTotalProjectProfitMarginMutation();
  const [projects, setProjects] = useState();
  const fetchProfitStats = async () => {
    try {
      const result = await getProjectDeadlineStats({
        userId,
        projectId,
      }).unwrap();
      setProjects(result);
      // console.log(
      //   "Success useGetTotalProjectProfitMarginMutation Results Results Results:",
      //   result
      // );
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchProfitStats();
  }, []);
  const phase = data?.projects[0]?.Phases;
  // const data = [
  //     { title: 'Recent Daily Logs' },
  //     { title: 'Incomplete To-Do’s' },
  //     { title: 'Pending Change Orders' },
  //     { title: 'Upcoming Selections' },
  //     { title: 'Unread Messages' },
  //     { title: 'Incomplete Surveys' },
  //     { title: 'Incomplete Invoices' }
  // ];

  return (
    <>
      {/* <div>
        <Typography sx={themeStyle.heading}>What’s Happening</Typography>

        {data.map((item, index) => (
          <Box key={index} sx={themeStyle.box}>
            <Typography sx={themeStyle.listItem}>{item.title}</Typography>
            <Button sx={themeStyle.circleButton}>1</Button>
          </Box>
        ))}
        
      </div> */}
       <Stack p={1} pl={3} pr={3} spacing={2} height={'305px'}>
        {/* <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Approved Price</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Collected</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Remaining Balance</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Cost to Complete</Typography><Typography sx={themeStyle.price}>{formattedCost}</Typography></Stack> */}
        {phase?.map((item, index)=>{
          if(index >3){
            return<></>
          }
            return(
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>{item?.phase_name}</Typography><Typography sx={themeStyle.price}>${formatMoney(item?.totalCost)}</Typography></Stack>
            )
        })}
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Total Cost</Typography><Typography sx={themeStyle.price}>${formatMoney(data?.totalCost)}</Typography></Stack>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}><Typography sx={themeStyle.label}>Projected Margin</Typography><Typography sx={themeStyle.price}>${formatMoney(data?.totalMargin)}</Typography></Stack>
    </Stack>
    </>
  );
}

const themeStyle = {
  heading: {
    color: "#4C8AB1",
    fontFamily: 'var(--main-font-family)',
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  box: {
    display: "flex",
    marginTop: "0.3rem",
    gap: "1rem",
    justifyContent: "space-between",
  },
  listItem: {
    color: "#000000",
    fontFamily: 'var(--main-font-family)',
    opacity: "70%",
    whiteSpace: "nowrap",
    paddingLeft: "2rem",
    fontWeight: 200,
  },
  circleButton: {
    borderRadius: "50%", // Make the button circular
    minWidth: "9%",
    backgroundColor: "#FFAC00", // Yellow color
    color: "white", // White content color
    fontSize: "12px", // Adjust the font size
    fontWeight: 100, // Adjust the font weight if needed
    marginRight: "2rem",
    transition: "background-color 0.3s", // Add transition for smooth effect
    "&:hover": {
      backgroundColor: "#FFD740", // Yellow color with shade
    },
  },
  label: {
    fontSize: '20px',
    color: '#2F2F2F',
    fontFamily: 'var(--main-font-family)',
    fontWeight: '500',
},
price: {
    fontSize: '18px',
    color: '#4C8AB1',
    fontFamily: 'var(--main-font-family)',
    fontWeight: '600',
}
};

export default WhatsHappeningCard;
