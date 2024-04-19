import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tab,
  Typography,
} from "@mui/material";
import { useGetProjectChangeOrderQuery } from "../../../redux/apis/Project/projectApiSlice";
import { useParams } from "react-router-dom";
import Button from "../../UI/CustomButton";

const ChangeOrder = () => {
  const params = useParams();
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  //console.log(user);
  const { data } = useGetProjectChangeOrderQuery({
    projectId: currentProjectId,
    userId: user.user.id,
  });
  //console.log(data);

  return (
    <TableContainer
      style={{ paddingLeft: "4px", paddingRight: "4px", width: "100%" }}
    >
      <Table size="small" aria-label="Change Order Table">
        <TableHead>
          <TableRow>
            <TableCell sx={themeStyle.tableHeader}>Subject</TableCell>
            <TableCell sx={themeStyle.tableHeader}>Description</TableCell>
            {/* <TableCell sx={tableCellStyle}>Unit</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Margin</TableCell> */}
            <TableCell sx={themeStyle.tableHeader}>priority</TableCell>
            <TableCell sx={themeStyle.tableHeader}>Total</TableCell>
            <TableCell sx={themeStyle.tableHeader}>Start</TableCell>
            <TableCell sx={themeStyle.tableHeader}>End</TableCell>
            {/* <TableCell sx={tableCellStyle}>Quantity</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Unit Price</TableCell> */}
            <TableCell sx={themeStyle.tableHeader}>Status</TableCell>
            <TableCell sx={themeStyle.tableHeader}>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ paddingLeft: "4px", paddingRight: "4px" }}>
          {data?.data?.workOrderReqs.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={themeStyle.tableBody}>{row.subject}</TableCell>
              <TableCell sx={{ ...themeStyle.tableBody }}>
                {/* <Typography p={"4px 8px 4px 8px"} borderRadius={'28px'} sx={{backgroundColor:'#FFC8C8', color:'#F03434'}} fontSize={'12px'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} > */}
                {row.description}
                {/* </Typography> */}
              </TableCell>
              <TableCell sx={themeStyle.tableBody}>{row.priority}</TableCell>
              <TableCell sx={{ ...themeStyle.tableBody }}>
                {row.total}
              </TableCell>
              <TableCell sx={{ ...themeStyle.tableBody }}>
                {row.start_day}
              </TableCell>
              <TableCell sx={themeStyle.tableBody}>{row.end_day}</TableCell>
              <TableCell sx={themeStyle.tableBody}>
                <Button
                  buttonText={row.status} // Assuming status property represents the status
                  color={row.status === "pending" ? "#DF0404" : "#000000"} // Adjust colors based on status
                  backgroundColor={
                    row.status === "pending" ? "#FFDADA" : "#FFFFFF"
                  } // Adjust background colors based on status
                  width="101px"
                  height="27px"
                  borderRadius="45px"
                />
              </TableCell>
              <TableCell
                sx={{
                  ...themeStyle.tableBody,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {row.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChangeOrder;

const themeStyle = {
  tableHeader: {
    fontSize: "12px",
    fontFamily: "Poppins, sans-serif",
    color: "#5B5B5B",
    whiteSpace: "nowrap",
  },
  tableBody: {
    fontSize: "12px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#000000",
    padding: "8px 4px 4px 4px",
  },
};