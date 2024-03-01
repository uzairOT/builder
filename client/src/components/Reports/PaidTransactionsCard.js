import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

const PaidTransactionsCard = () => {
  const data = [
    {
      role: "Client",
      paid: 454,
    },
    {
      role: "Project Manager",
      paid: 600,
    },
    {
      role: "Team Member 1",
      paid: 300,
    },
    {
      role: "Team Member 2",
      paid: 250,
    },
  ];

  return (
    <Stack justifyContent={'space-between'} height={'100%'}>
      <Stack >
        <Stack direction={"row"} alignItems={"center"} p={1} pl={2} pr={2}>
          <Typography
            fontSize={"20px"}
            fontFamily={"Inter, sans serif"}
            fontWeight={"500"}
            color={"#4C8AB1"}
          >
            Paid Transactions
          </Typography>
        </Stack>
        <Divider variant="fullWidth" />
        <Stack p={2} spacing={1}>
          {data.map((data, index) => (
            <Stack key={index} direction={"row"} justifyContent={"space-between"}>
              <Typography
                fontFamily={"Inter, sans-serif"}
                fontWeight={"500"}
                fontSize={"16px"}
                color={"#5B5B5B"}
              >
                {data.role}
              </Typography>
              <Typography
                fontFamily={"Inter, sans-serif"}
                fontWeight={"500"}
                fontSize={"16px"}
                color={"#000000"}
              >
                $ {data.paid}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Divider variant="fullWidth" />
        <Stack direction={'row'} justifyContent={'space-between'} p={2}>

        <Typography
                fontFamily={"Inter, sans-serif"}
                fontWeight={"500"}
                fontSize={"16px"}
                color={"#5B5B5B"}
                >
                Total Payment Done
              </Typography>
              <Typography
                fontFamily={"Inter, sans-serif"}
                fontWeight={"500"}
                fontSize={"16px"}
                color={"#000000"}
              >
                $ 400
              </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PaidTransactionsCard;
