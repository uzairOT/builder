import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TotalDaysAllotted from "./TotalDaysAllotted";
import DaysAllottedCalendar from "./DaysAllottedCalendar";
import { useGetWorkDayStatsMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";

const TotalDaysAllottedView = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;
  const [getWorkDayStats, { data, error, isLoading }] =
    useGetWorkDayStatsMutation();

  const [startRange, setStartRange] = useState(null);
  const [endRange, setEndRange] = useState(null);
  // Trigger the mutation when needed, e.g., on a button click
  const fetchWorkStats = async () => {
    try {
      const result = await getWorkDayStats({
        userId,
        startRange,
        endRange,
        projectId,
      }).unwrap();
      console.log("Success22:", result);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchWorkStats();
  }, [startRange, endRange]);
  return (
    <Stack
      direction={{ xl: "row", lg: "row", md: "row", sm: "row", xs: "column" }}
      justifyContent={"space-evenly"}
      pb={2}
      pt={2}
    >
      <TotalDaysAllotted data={data} />
      <Stack pr={1}>
        <DaysAllottedCalendar
          setStartRange={setStartRange}
          setEndRange={setEndRange}
          startRange={startRange}
          endRange={endRange}
        />
      </Stack>
    </Stack>
  );
};

export default TotalDaysAllottedView;
