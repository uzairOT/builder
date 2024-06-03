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
function InvoicesTable({
  setUpdateModalOpen,
  data,
  setCheckedRow,
  checkedRow,
//   workOrder,
  status,
  setPhaseItems
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
    setPhaseItems(null);
    setCheckedRow((prevCheckedRow) => (prevCheckedRow === row ? null : row));
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ height: "80vh", scrollbarWidth: "thin",  boxShadow: "none"  }}
    >
      <Table>
        <TableHead>
          <TableRow>
           
            <TableCell></TableCell>
            <TableCell sx={tableCellStyle}>Invoice Number</TableCell>
            <TableCell sx={tableCellStyle}>Invoice Date</TableCell>
            <TableCell sx={tableCellStyle}>Invoice Due Date</TableCell>
            <TableCell sx={tableCellStyle}>Invoice Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => {
           
              return (
                <TableRow key={item.id}>
                
                    <TableCell sx={tableCellValueStyle}>
                      <Checkbox
                        checked={checkedRow === item}
                        onChange={() => handleCheckboxChange(item, data)}
                      />
                    </TableCell>
                  
                  <TableCell sx={tableCellValueStyle}>{item.InvoiceNumber}</TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {moment(item.InvoiceDate).format('MMM D, YYYY, h:mm a')}
                  </TableCell>
                  {/* <TableCell sx={tableCellValueStyle}>{item.LineItem.unit}</TableCell>
    <TableCell sx={tableCellValueStyle}>{item.LineItem.margin}</TableCell>
    <TableCell sx={tableCellValueStyle}>{item.LineItem.projectProfile}</TableCell> */}
                  <TableCell sx={tableCellValueStyle}>
                    {moment(item.InvoiceDueDate).format('MMM D, YYYY, h:mm a')}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>{item.InvoiceStatus}</TableCell>
                </TableRow>
              );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default InvoicesTable;
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
