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
  Tooltip,
} from "@mui/material";
import Button from "../../UI/CustomButton";
import ChangeOrder from "../ProjectsDefault/ChangeOrder";
import NotificationDetailModal from "../../Navbar/NotificationDetailModal";
import { useGetWorkOrderDetailsMutation } from "../../../redux/apis/Project/projectApiSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import moment from "moment";
import { usePaidInvoiceMutation } from "../../../redux/apis/Invoices/ClientInvoiceApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";
import GenerateInvoice from "../../dialogues/GenerateInvoice/GenerateInvoice";
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
  refetch,
  setPhaseItems,
  paidInvoices,
}) {
  // console.log('INSIDE WORKORDER: ',data)
  const [open, setOpen] = useState(false);
  const [invoicePaid, { isLoading }] = usePaidInvoiceMutation();
  const [invoiceData, setInvoiceData] = useState(null);
  const userRole = useSelector(getUserRoleFromRedux);
  const userInfo = useSelector(state =>  state.auth.userInfo);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = async (id, adminId) => {
    try {
      if(adminId !== userInfo.user.id){
        toast.warning("Only the person who generated the invoice can perform this action.");
        return; // Exit the function to prevent further execution
      }
      const res = await invoicePaid({ invoiceId: id });
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleOnClickDetails = (item) => {
    setInvoiceData({
      invoiceCompleteObj: item,
    });
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
    <>
      <TableContainer
        component={Paper}
        sx={{ height: "80vh", scrollbarWidth: "thin", boxShadow: "none" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>Select</TableCell>
              <TableCell sx={tableCellStyle}>Invoice Number</TableCell>
              <TableCell sx={tableCellStyle}>Invoice Date</TableCell>
              <TableCell sx={tableCellStyle}>Invoice Due</TableCell>
              <TableCell sx={tableCellStyle}>Invoice Status</TableCell>
              <TableCell sx={tableCellStyle}>Invoice Bill</TableCell>
              <TableCell sx={tableCellStyle}>Payment Method</TableCell>
              <TableCell sx={tableCellStyle}>Invoice Notes</TableCell>
              {!paidInvoices && (
                <TableCell sx={tableCellStyle}>Invoice Paid</TableCell>
              )}
              <TableCell sx={tableCellStyle}>Invoice Details</TableCell>
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

                  <TableCell sx={tableCellValueStyle}>
                    {item.InvoiceNumber}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {moment(item.InvoiceDate).format("MM/DD/YYYY h:mm a")}
                  </TableCell>
                  {/* <TableCell sx={tableCellValueStyle}>{item.LineItem.unit}</TableCell>
    <TableCell sx={tableCellValueStyle}>{item.LineItem.margin}</TableCell>
    <TableCell sx={tableCellValueStyle}>{item.LineItem.projectProfile}</TableCell> */}
                  <TableCell sx={tableCellValueStyle}>
                    {moment(item.InvoiceDueDate).format("MM/DD/YYYY h:mm a")}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {item.InvoiceStatus}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {item.InvoiceBill}
                  </TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    {item?.ProjectPayments[0]?.PaymentMethod ? item?.ProjectPayments[0]?.PaymentMethod : "-"}
                  </TableCell>
                  {/* Apply the Tooltip directly to a specific cell */}
                  <TableCell sx={tableCellValueStyle}>
                    <Tooltip title={item?.notes || "No notes available"}>
                      <span>{item?.notes ? "View Notes" : "-"}</span>
                    </Tooltip>
                  </TableCell>
                  {!paidInvoices && (
                    <TableCell sx={TableButtonsStyle}>
                      <BuilderProButton
                        variant={"contained"}
                        backgroundColor={"#4C8AB1"}
                        fontSize={"11px"}
                        fontFamily={"var(--main-font-family)"}
                        marginLeft={"5px"}
                        handleOnClick={() => handleOnClick(item.id, item.Admin.id)}
                        disabled={isLoading}
                      >
                        Paid
                      </BuilderProButton>
                    </TableCell>
                  )}
                  <TableCell sx={TableButtonsStyle}>
                    <BuilderProButton
                      variant={"contained"}
                      backgroundColor={"#4C8AB1"}
                      fontSize={"11px"}
                      fontFamily={"var(--main-font-family)"}
                      marginLeft={"5px"}
                      handleOnClick={() => handleOnClickDetails(item)}
                      disabled={isLoading}
                    >
                      Details
                    </BuilderProButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <GenerateInvoice
        open={open}
        handleClose={handleClose}
        invoiceData={invoiceData}
      />
    </>
  );
}
export default InvoicesTable;
const tableCellStyle = {
  maxWidth: { xl: "80px", lg: "80px", md: "70px", xs: "100%" },
  minWidth: { xl: "80px", lg: "80px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 500,
  fontSize: { xl: "14px", lg: "11px", md: "11px", xs: "11px" },
  fontFamily: "var(--main-font-family)",
  color: "#8C8C8C",
  textAlign: "left",
};
const tableCellValueStyle = {
  maxWidth: { xl: "80px", lg: "80px", md: "70px", xs: "100%" },
  minWidth: { xl: "80px", lg: "80px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 400,
  fontSize: { xl: "14px", lg: "11px", md: "11px", xs: "11px" },
  borderBottom: "none",
  fontFamily: "var(--main-font-family)",
  color: "#000000",
  textAlign: "left",
  justifyContent: "left",
};

const TableButtonsStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 400,
  fontSize: { xl: "14px", lg: "11px", md: "11px", xs: "11px" },
  borderBottom: "none",
  fontFamily: "var(--main-font-family)",
  color: "#000000",
  textAlign: "left",
  justifyContent: "left",
};
