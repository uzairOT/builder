import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import NotificationDetailModal from "../../Navbar/NotificationDetailModal";
import { useGetWorkOrderDetailsMutation } from "../../../redux/apis/Project/projectApiSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import moment from 'moment';
import { useTranslation } from 'react-i18next'; 
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
function WorkOrder({
  setUpdateModalOpen,
  data,
  setCheckedRow,
  checkedRow,
  workOrder,
  status,
  setPhaseItems
}) {
  const {t} = useTranslation()
  // console.log('INSIDE WORKORDER: ',data)
  const [open, setOpen] = useState(false);
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation();
  const [data1, setData1] = useState(null);
  const handleOnClick = async (workOrderId) => {
 
    const res = await getWorkOrder({workOrderId: workOrderId});
    setData1(res.data);
    setOpen(true);
  };
  // const handleUnitChange = (event, id) => {
  //   const selectedUnit = event.target.value;
  //   // Assuming you have a function to update the unit value in your data structure
  //   // Update the unit value for the corresponding row with the given ID
  //   // For example, if you're using state:
  // };
  // const OpenUpdateModal = () => {
  //   //console.log("UpdateModal");
  //   setUpdateModalOpen(true);
  // };
  // const handleCheckboxChange = (row) => {
  //   setPhaseItems(null);
  //   setCheckedRow((prevCheckedRow) => (prevCheckedRow === row ? null : row));
  // };
  return (
    <TableContainer
      component={Paper}
      sx={{ height: workOrder ? {xl:'300px', lg:'200px', md:'200px', sm:'300px'} : "80vh", scrollbarWidth: "thin",  boxShadow: "none"  }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {/* {workOrder ? <></> : <TableCell sx={tableCellStyle}>Select</TableCell>} */}
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title1")}</TableCell>
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title2")}</TableCell>
            {/* <TableCell sx={tableCellStyle}>Unit</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Margin</TableCell> */}
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title3")}</TableCell>
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title4")}</TableCell>
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title5")}</TableCell>
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title6")}</TableCell>
            {/* <TableCell sx={tableCellStyle}>Quantity</TableCell> */}
            {/* <TableCell sx={tableCellStyle}>Unit Price</TableCell> */}
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title7")}</TableCell>
            <TableCell sx={tableCellStyle}>{t("ProjectWorkOrder.table.title8")}</TableCell>
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
                    <></>
                    // <TableCell sx={tableCellValueStyle}>
                    //   <Checkbox
                    //     checked={checkedRow === item}
                    //     onChange={() => handleCheckboxChange(item, data)}
                    //   />
                    // </TableCell>
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
                  <TableCell sx={tableCellValueStyle}>${formatMoney(item.total)}</TableCell>
                  <TableCell sx={{...tableCellValueStyle, whiteSpace:'nowrap'}}>
                    {moment(item.start_day).format('MM/DD/YYYY, h:mm a')}
                  </TableCell>
                  <TableCell sx={{...tableCellValueStyle, whiteSpace:'nowrap'}}>{moment(item.end_day).format('MM/DD/YYYY, h:mm a')}</TableCell>
                  <TableCell sx={tableCellValueStyle}>
                  {item.version> 1 ? `change order ${item.status}` : t(`WorkOrder.${item.status}`)}
                    {/* <Button
                      buttonText= // Assuming status property represents the status
                      color={item.status === "pending" ? "#DF0404" : "#000000"} // Adjust colors based on status
                      backgroundColor={
                        item.status === "pending" ? "#FFDADA" : "#FFFFFF"
                      } // Adjust background colors based on status
                      width="101px"
                      height="27px"
                      borderRadius="45px"
                    /> */}
                  </TableCell>
                  {/* <TableCell sx={tableCellValueStyle}>{item.status}</TableCell> */}
                  <TableCell sx={tableCellValueStyle}>{item.notes}</TableCell>
                  <TableCell sx={tableCellValueStyle}>
                    <BuilderProButton
                      variant={"contained"}
                      backgroundColor={"#4C8AB1"}
                      fontSize={"11px"}
                      fontFamily={'var(--main-font-family)'}
                      marginLeft={"5px"}
                      handleOnClick={() => handleOnClick(item.id)}
                    >
                      {t("ProjectWorkOrder.table.title9")}
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
                        data1={data1}
                        open={open}
                        setOpen={setOpen}
                      />
                    )}
    </TableContainer>
  );
}
export default WorkOrder;
const tableCellStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  // textOverflow:'ellipsis',
  overflow:'hidden',
  fontWeight: 500,
  fontSize: "11px",
  // fontFamily: 'var(--main-font-family)',
   textAlign:'left'
};



const tableCellValueStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow:'ellipsis',
  overflow:'hidden',
  // whiteSpace: "wrap",
  fontSize: "11px",
  fontWeight: 500,
  borderBottom: "none",
  // fontFamily: 'var(--main-font-family)',
  // color: "#000000",

};
