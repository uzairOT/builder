import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import Button from "../../UI/CustomButton";
import ChangeOrder from "../ProjectsDefault/ChangeOrder";
import NotificationDetailModal from "../../Navbar/NotificationDetailModal";
import { useGetWorkOrderDetailsMutation } from "../../../redux/apis/Project/projectApiSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import moment from 'moment';
const dummyData = [
  {
    id: 1,
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
    checkbox: false, // New field for the checkbox
    lineItem: "Item 1", // New field for the line item
    margin: "10%", // New field for the margin
    projectProfile: "Profile 1", // New field for the project profile
  },
  {
    id: 2,
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
    checkbox: false, // New field for the checkbox
    lineItem: "Item 1", // New field for the line item
    margin: "10%", // New field for the margin
    projectProfile: "Profile 1", // New field for the project profile
  },
  {
    id: 3,
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
    checkbox: false, // New field for the checkbox
    lineItem: "Item 1", // New field for the line item
    margin: "10%", // New field for the margin
    projectProfile: "Profile 1", // New field for the project profile
  },
];
function WorkOrder({
  setUpdateModalOpen,
  data,
  setCheckedRow,
  checkedRow,
  workOrder,
  status,
}) {
  // console.log('INSIDE WORKORDER: ',data)
  const [open, setOpen] = useState(false);
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation();
  const [data1, setData1] = useState(null);
  const handleOnClick = async (workOrderId) => {
 
    const res = await getWorkOrder({workOrderId: workOrderId});
    setData1(res.data);
    setOpen(true);
  };
  const handleUnitChange = (event, id) => {
    const selectedUnit = event.target.value;
    // Assuming you have a function to update the unit value in your data structure
    // Update the unit value for the corresponding row with the given ID
    // For example, if you're using state:
  };
  const OpenUpdateModal = () => {
    //console.log("UpdateModal");
    setUpdateModalOpen(true);
  };
  const handleCheckboxChange = (row) => {
    setCheckedRow((prevCheckedRow) => (prevCheckedRow === row ? null : row));
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "none" }}
      style={{ height: workOrder ? "300px" : "80vh", scrollbarWidth: "thin" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {workOrder ? <></> : <TableCell>{/* <Checkbox  /> */}</TableCell>}
            <TableCell sx={tableCellStyle}>Subject</TableCell>
            <TableCell sx={tableCellStyle}>Description</TableCell>
            {/* <TableCell sx={tableCellStyle}>Unit</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Margin</TableCell> */}
            <TableCell sx={tableCellStyle}>priority</TableCell>
            <TableCell sx={tableCellStyle}>Total</TableCell>
            <TableCell sx={tableCellStyle}>Start</TableCell>
            <TableCell sx={tableCellStyle}>End</TableCell>
            {/* <TableCell sx={tableCellStyle}>Quantity</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Unit Price</TableCell> */}
            <TableCell sx={tableCellStyle}>Status</TableCell>
            <TableCell sx={tableCellStyle}>Notes</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.workOrderReqs.map((item) => {
            if (status === item.status) {
              return (
                <TableRow key={item.id}>
                  {workOrder ? (
                    <></>
                  ) : (
                    <TableCell sx={tableCellValueStyle}>
                      <Checkbox
                        checked={checkedRow === item}
                        onChange={() => handleCheckboxChange(item, data)}
                      />
                    </TableCell>
                  )}
                  <TableCell sx={tableCellValueStyle}>{item.subject}</TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {item.description}
                  </TableCell>
                  {/* <TableCell sx={tableCellValueStyle}>{item.LineItem.unit}</TableCell>
    <TableCell sx={tableCellValueStyle}>{item.LineItem.margin}</TableCell>
    <TableCell sx={tableCellValueStyle}>{item.LineItem.projectProfile}</TableCell> */}
                  <TableCell sx={tableCellValueStyle}>
                    {item.priority}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>{item.total}</TableCell>
                  <TableCell sx={{...tableCellValueStyle, whiteSpace:'nowrap'}}>
                    {moment(item.start_day).format('MMM D, YYYY, h:mm a')}
                  </TableCell>
                  <TableCell sx={{...tableCellValueStyle, whiteSpace:'nowrap'}}>{moment(item.end_day).format('MMM D, YYYY, h:mm a')}</TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    <Button
                      buttonText={item.status} // Assuming status property represents the status
                      color={item.status === "pending" ? "#DF0404" : "#000000"} // Adjust colors based on status
                      backgroundColor={
                        item.status === "pending" ? "#FFDADA" : "#FFFFFF"
                      } // Adjust background colors based on status
                      width="101px"
                      height="27px"
                      borderRadius="45px"
                    />
                  </TableCell>
                  {/* <TableCell sx={tableCellValueStyle}>{item.status}</TableCell> */}
                  <TableCell sx={tableCellValueStyle}>{item.notes}</TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    <BuilderProButton
                      variant={"contained"}
                      backgroundColor={"#4C8AB1"}
                      fontSize={"11px"}
                      fontFamily={"Inter, sans serif"}
                      marginLeft={"5px"}
                      handleOnClick={() => handleOnClick(item.id)}
                    >
                      Detail
                    </BuilderProButton>
                  
                  </TableCell>
                </TableRow>
              );
            } else {
              return <></>;
            }
          })}
        </TableBody>
      </Table>
      {data1 === null ? (
                      <></>
                    ) : (
                      <NotificationDetailModal
                        notification={data1}
                        isEvent={true}
                        open={open}
                        setOpen={setOpen}
                      />
                    )}
    </TableContainer>
  );
}
export default WorkOrder;
const tableCellStyle = {
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "Poppins",
  color: "#8C8C8C",
};
const tableCellValueStyle = {
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "Montserrat",
  color: "#000000",

};
