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

const ChangeOrder = ({value}) => {
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
      style={{ paddingLeft: "4px", paddingRight: "4px", width: "95%", height:'60vh' }}
      
    >
      <Table size="small" aria-label="Change Order Table">
        <TableHead>
          <TableRow>
            {/* <TableCell sx={themeStyle.tableHeader}></TableCell> */}
            <TableCell sx={themeStyle.tableHeader}>Subject</TableCell>
            <TableCell sx={themeStyle.tableHeader}>Description</TableCell>
            {/* <TableCell sx={tableCellStyle}>Margin</TableCell> */}
            <TableCell sx={themeStyle.tableHeader}>priority</TableCell>
            {/* <TableCell sx={themeStyle.tableHeader}>Total</TableCell> */}
            {/* <TableCell sx={themeStyle.tableHeader}>Start</TableCell> */}
            {/* <TableCell sx={themeStyle.tableHeader}>End</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Quantity</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Unit Price</TableCell> */}
            {/* <TableCell sx={themeStyle.tableHeader}>Status</TableCell> */}
            {/* <TableCell sx={themeStyle.tableHeader}>Notes</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody style={{ paddingLeft: "4px", paddingRight: "4px" }}>
          {data?.data?.workOrderReqs.map((row,index) => { 
            if(value === 0 && row.status === 'pending') {
            return(
            <TableRow key={row.id}>
              {/* <TableCell sx={themeStyle.tableBody}>{index+1}.</TableCell> */}
              <TableCell sx={themeStyle.tableBody}>{row.subject}</TableCell>
              <TableCell sx={{ ...themeStyle.tableBody }}>
                <Typography p={"4px 8px 4px 8px"} borderRadius={'28px'} fontSize={'12px'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} >
                {row.description}
                </Typography>
              </TableCell>
              <TableCell sx={themeStyle.tableBody}>{row.priority}</TableCell>
            </TableRow>
          )}
            if(value === 1 && row.status === 'approved') {
            return(
            <TableRow key={row.id}>
              {/* <TableCell sx={themeStyle.tableBody}>{index+1}.</TableCell> */}
              <TableCell sx={themeStyle.tableBody}>{row.subject}</TableCell>
              <TableCell sx={{ ...themeStyle.tableBody }}>
                <Typography p={"4px 8px 4px 8px"} borderRadius={'28px'} fontSize={'12px'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} >
                {row.description}
                </Typography>
              </TableCell>
              <TableCell sx={themeStyle.tableBody}>{row.priority}</TableCell>
            </TableRow>
          )}
            if(value === 2 && row.status === 'declined') {
            return(
            <TableRow key={row.id}>
              {/* <TableCell sx={themeStyle.tableBody}>{index+1}.</TableCell> */}
              <TableCell sx={themeStyle.tableBody}>{row.subject}</TableCell>
              <TableCell sx={{ ...themeStyle.tableBody }}>
                <Typography p={"4px 8px 4px 8px"} borderRadius={'28px'} fontSize={'12px'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} >
                {row.description}
                </Typography>
              </TableCell>
              <TableCell sx={themeStyle.tableBody}>{row.priority}</TableCell>
            </TableRow>
          )}
          
          
          })}
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
    border: 'none'
  },
  tableBody: {
    fontSize: "12px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#000000",
    padding: "8px 4px 4px 4px",
  },
};