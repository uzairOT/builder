import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Grid,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";
import EditIcon from "../../../assets/settings/edit.png";
import { useGetMasterLineItemsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { useSelector } from "react-redux";
import UpdateMasterLine from "../../dialogues/UpdateMasterLine/UpdateMasterLine";
import { useTranslation } from "react-i18next";

const dummyData = [
  {
    id: 1,
    avatar: "avatar1.jpg",
    name: "Jackson",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
  },
  {
    id: 2,
    avatar: "avatar1.jpg",
    name: "Jackson",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
  },
  {
    id: 3,
    avatar: "avatar1.jpg",
    name: "Jackson",
    jobProject: "Project X",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    country: "USA",
    projectStatus: "done",
    description: "Project description",
    unit: "kg",
    quantity: 10,
    unitPrice: 25.5,
    total: 255,
    start: "2024-02-01",
    end: "2024-02-28",
    notes: "Project notes",
  },
  // Add more dummy data objects as needed
];

function MasterLineTable({
  setUpdateModalOpen,
  searchInput,
  page,
  setTotalEntries,
  setTotalPages,
}) {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data, isLoading, refetch, error } = useGetMasterLineItemsQuery({
    userId: userInfo.user.id,
    q: searchInput,
    page: page,
  });
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const [masterLine, setMasterLine] = useState();
  // console.log(data);

  const handleUpdateOpen = (row) => {
    setMasterLine(row);
    setShowUpdateLine(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateLine(false);
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

  useEffect(() => {
    if (data) {
      setTotalEntries(data?.totalCount);
      setTotalPages(data?.totalPages);
    }
  }, [data]);

  return (
    <Grid
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      width={{ xl: "100%", lg: "100%", md: "100%", xs: "100%" }}
    >
      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.name")}</TableCell>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.description")}</TableCell>
              <TableCell sx={tableCellStyle}>
                {t("Settings.masterTable.unit")}
                {/* <IconButton>
                <Select
                  value={""}
                  onChange={(e) => handleUnitChange(e)} // Assuming you have a function to handle unit changes
                  input={<Input sx={{ underline: "none" }} />} // Apply underline: 'none' style here
                >
                   {Units.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  
                </Select>
              </IconButton> */}
              </TableCell>

              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.quantity")}</TableCell>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.unitPrice")}</TableCell>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.quantity")}</TableCell>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.profit")}</TableCell>
              {/* <TableCell sx={tableCellStyle}>Start</TableCell>
            <TableCell sx={tableCellStyle}>End</TableCell> */}
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.totalCost")}</TableCell>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.notes")}</TableCell>
              <TableCell sx={tableCellStyle}>{t("Settings.masterTable.action")}</TableCell>
            </TableRow>
          </TableHead>
          {error ? (
            <Stack p={2}>{t("Settings.masterTable.error")}</Stack>
          ) : (
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    {/* <TableCell sx={tableCellValueStyle}>{moment(row.start_day).format('YYYY-MM-DD')}</TableCell>
              <TableCell sx={tableCellValueStyle}>{moment(row.end_day).format('YYYY-MM-DD')}</TableCell> */}
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}></TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      <IconButton aria-label="edit" size="small">
                        <img src={EditIcon} alt="" style={{ width: "35px" }} />
                      </IconButton>
                      {/* <IconButton aria-label="delete" size="small">
                  <img src={DeleteIcon} alt="" style={{width:'35px'}} />
                </IconButton> */}
                    </TableCell>
                  </TableRow>
                </>
              ) : data?.MasterLines?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    sx={{
                      textAlign: "center",
                      borderBottom: "none",
                      fontFamily: "var(--main-font-family)",
                    }}
                  >
                    <Typography paddingTop={30} paddingBottom={30}>
                      {t("Settings.masterTable.noRecords")}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data?.MasterLines?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={tableCellValueStyle}>{row.title}</TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      {row.description}
                    </TableCell>
                    <TableCell sx={tableCellValueStyle}>{row.unit}</TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      {row.quantity}
                    </TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      {row.unit_price}
                    </TableCell>
                    <TableCell sx={tableCellValueStyle}>${row.total}</TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      ${row?.margin ? row?.margin : 0}
                    </TableCell>
                    {/* <TableCell sx={tableCellValueStyle}>{moment(row.start_day).format('YYYY-MM-DD')}</TableCell>
              <TableCell sx={tableCellValueStyle}>{moment(row.end_day).format('YYYY-MM-DD')}</TableCell> */}
                    <TableCell sx={tableCellValueStyle}>
                      ${isNaN(Number(row?.total) + Number(row?.margin)) ? 0 : Number(row?.total) + Number(row?.margin)}
                    </TableCell>
                    <TableCell sx={tableCellNotesStyle}>{row.notes}</TableCell>
                    <TableCell sx={tableCellValueStyle}>
                      {row?.template ? <Tooltip title="Template"><Chip
                        label="Template"
                        color="primary"
                        size="small"
                        variant="outlined"

                      /></Tooltip> : <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() => handleUpdateOpen(row)} // Pass row data to the function
                      >
                        <img src={EditIcon} alt="" style={{ width: "35px" }} />
                      </IconButton>}
                      {/* <IconButton aria-label="delete" size="small">
                  <img src={DeleteIcon} alt="" style={{width:'35px'}} />
                </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
        {showUpdateLine && (
          <UpdateMasterLine
            handleUpdateOpen={handleUpdateOpen}
            handleUpdateClose={handleUpdateClose}
            MasterLineItem={masterLine}
            refetch={refetch}
            userId={userInfo.user.id}
          />
        )}
      </TableContainer>
    </Grid>
  );
}

export default MasterLineTable;

const tableCellStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 500,
  fontSize: "14px",
  fontFamily: "var(--main-font-family)",
};

const tableCellValueStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "var(--main-font-family)",
  color: "#000000",
};

const tableCellNotesStyle = {
  maxWidth: { xl: "20px", lg: "30px", md: "70px", xs: "100%" },
  minWidth: { xl: "10px", lg: "20px", md: "40px", xs: "20px" },
  overflow: "auto",
  fontWeight: 400,
  borderBottom: "none",
  fontFamily: "var(--main-font-family)",
  color: "#000000",
};
