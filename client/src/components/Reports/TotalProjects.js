import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReportsPieChart from "./ReportsPieChart";
import CircleIcon from "@mui/icons-material/Circle";
import { useGetReportsStatsQuery } from "../../redux/apis/Reports/reportsApiSlice";

const TotalProjects = () => {
  const {data} = useGetReportsStatsQuery({});
//   const [data, setData] = React.useState([]);
//   const fetchData = async () => {
   
//     try {
     
//       const response = await getReportsStats().unwrap();

    
//       if (response.data.length === 0) {
//         return; 
//       } else {
//         console.log("--6--666--6-6-6-6", response);
     
//       }
//     } catch (error) {
    
//       console.error("API call failed:", error);
//     }

   
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
console.log(data);

  return (
    <Stack p={1}>
      <Typography
        fontSize={"15px"}
        fontWeight={"500"}
        fontFamily={"Inter, sans serif"}
        p={1}
      >
        Total Projects-=-=-=
      </Typography>
      <Stack direction={"row"}>
        <Stack flex={1}>
          <Typography
            fontSize={"27px"}
            fontWeight={"500"}
            fontFamily={"Inter, sans serif"}
            p={"0px 8px 8px 8px"}
          >
            15
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#45A5F6", fontSize: "10px" }} />
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Done
            </Typography>
          </Stack>
          <Typography pl={2} fontFamily={"Inter, sans serif"} fontSize={"18px"}>
            3
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <CircleIcon sx={{ color: "#DDE6FE", fontSize: "10px" }} />
            <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
              Remaining
            </Typography>
          </Stack>
          <Typography pl={2} fontFamily={"Inter, sans serif"} fontSize={"18px"}>
            12
          </Typography>
        </Stack>
        <Stack flex={2} justifyContent={"center"} alignItems={"center"}>
          <ReportsPieChart />
          <Stack direction={"row"} justifyContent={"space-evenly"} spacing={1}>
            <Stack direction={"column"}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CircleIcon sx={{ color: "#45A5F6", fontSize: "10px" }} />
                <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
                  Done
                </Typography>
              </Stack>
              <Typography textAlign={"right"}>20%</Typography>
            </Stack>
            <Stack direction={"column"}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <CircleIcon sx={{ color: "#DDE6FE", fontSize: "10px" }} />
                <Typography fontFamily={"Inter, sans serif"} fontSize={"12px"}>
                  Remaining
                </Typography>
              </Stack>
              <Typography textAlign={"center"}>80%</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TotalProjects;
