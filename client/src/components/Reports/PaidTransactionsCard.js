import { Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetTotalProjectTransactionMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";

const PaidTransactionsCard = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const [totalPayment, setTotalPayment] = useState(0);
  const { id } = useParams();
  const projectId = id;
  const [getTotalProjectTransaction, { data, error, isLoading }] =
    useGetTotalProjectTransactionMutation();

  const fetchCostStats = async () => {
    try {
      const result = await getTotalProjectTransaction({
        userId,
        projectId,
      }).unwrap();
      console.log("Success getProjectCostStats:", result);
      // Calculate total payment amount
      const total = result.reduce(
        (sum, transaction) => sum + parseFloat(transaction?.PaymentAmount || 0),
        0
      );
      setTotalPayment(total);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchCostStats();
  }, []);

  return (
    <Stack justifyContent={"space-between"} height={"100%"}>
      <Stack>
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
          {data &&
            data.map((transaction, index) => (
              <Stack
                key={index}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontFamily={"Inter, sans-serif"}
                  fontWeight={"500"}
                  fontSize={"16px"}
                  color={"#5B5B5B"}
                >
                  {transaction?.Client?.firstName}
                </Typography>
                <Typography
                  fontFamily={"Inter, sans-serif"}
                  fontWeight={"500"}
                  fontSize={"16px"}
                  color={"#000000"}
                >
                  $ {transaction?.PaymentAmount}
                </Typography>
              </Stack>
            ))}
        </Stack>
      </Stack>
      <Stack>
        <Divider variant="fullWidth" />
        <Stack direction={"row"} justifyContent={"space-between"} p={2}>
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
            $ {totalPayment}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PaidTransactionsCard;
