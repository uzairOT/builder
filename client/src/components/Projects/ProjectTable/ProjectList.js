import {
  Box,
  ButtonGroup,
  IconButton,
  Pagination,
  Paper,
  Popover,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchBar from "../../UI/SearchBar/SearchBar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

const ProjectList = ({ rows, isLoading }) => {
  const tableHeader = [
    { id: "client", title: "Client" },
    { id: "project", title: "Projects" },
    { id: "phoneNumber", title: "Phone Number" },
    { id: "approvedPrice", title: "Approved Price" },
    { id: "collected", title: "Collected" },
    { id: "remainingBalance", title: "Remaining Balance" },
    { id: "costToComplete", title: "Cost To Complete" },
    { id: "projectProfit", title: "Projected Profit" },
    { id: "projectMargin", title: "Projected Margin" },
    { id: "projectStatus", title: "Project Status" },
  ];

  const [page, setPage] = useState([]);

  const rowsPerPage = 6;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // useEffect(() => {
  //   fetch("https://my.api.mockaroo.com/bui.json?key=64d2dd90")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setRows(data);
  //     })
  //     .catch((err) => console.error("Error fetching data: ", err))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []); // Empty dependency array to execute the effect only once on component mount

  return (
    <Stack width={"100%"}>
      {/* Project List Header */}
      <Stack p={3}>
        {/* Project List Title */}
        <Stack
          direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
          }}
          justifyContent={{
            xl: "space-between",
            lg: "space-between",
            md: "space-between",
            sm: "space-between",
            xs: "flex-start",
          }}
          alignItems={{ xs: "flex-start" }}
          spacing={1}
        >
          <Stack pl={{ xl: 8, lg: 8, md: 8, sm: 8, xs: 3 }}>
            <Typography
              color={"#4C8AB1"}
              fontFamily={"Poppins, san serif"}
              fontSize={"22px"}
              fontWeight={"600"}
            >
              Project List
            </Typography>
            <Typography
              color={"#4C8AB1"}
              fontFamily={"Poppins, san serif"}
              fontSize={"14px"}
              fontWeight={"400"}
            >
              All projects are displayed here
            </Typography>
          </Stack>
          {/* Buttons Remodel And Filter */}
          <Stack direction={"row"} height={"35px"}>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#E7E7E7"}
              Icon={CloseIcon}
              iconProps={{ color: "#272727" }}
            >
              <Typography
                color={"#272727"}
                fontFamily={"Inter, sans serif"}
                fontSize={"12px"}
                fontWeight={"500"}
              >
                Remodel
              </Typography>
            </BuilderProButton>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#FFAC00"}
              Icon={FilterListIcon}
              fontFamily={"inherit"}
              fontSize={"12px"}
              handleOnClick={handleClick}
            >
              Filter
            </BuilderProButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx:{
                    
                  }
                }
              }}
            >
              <Stack p={1} borderRadius={"14px"} spacing={1}>
                <Typography
                  fontFamily={"Inter, sans serif"}
                  fontSize={"12px"}
                  fontWeight={"500"}
                >
                  Remodel
                </Typography>
                <Typography
                  fontFamily={"Inter, sans serif"}
                  fontSize={"12px"}
                  fontWeight={"500"}
                >
                  New Build
                </Typography>
                <Typography
                  fontFamily={"Inter, sans serif"}
                  fontSize={"12px"}
                  fontWeight={"500"}
                >
                  Commercial
                </Typography>
              </Stack>
            </Popover>
          </Stack>
        </Stack>
        <Stack
          alignSelf={{
            xl: "flex-end",
            lg: "flex-end",
            md: "flex-end",
            sm: "flex-end",
            xs: "flex-end",
          }}
          direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column-reverse",
          }}
          spacing={1}
        >
          <Stack alignSelf={"flex-end"}>
            <SearchBar />
          </Stack>
          <Stack
            width={{ xl: "150px", lg: "150px", md: "150px", sm: "150px" }}
            justifyContent={"flex-end"}
            alignSelf={"flex-end"}
          >
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#FFAC00"}
              fontFamily={"inherit"}
              fontSize={"12px"}
              marginLeft={0}
            >
              Add New
            </BuilderProButton>
          </Stack>
        </Stack>
      </Stack>
      {/* Table */}
      <Stack px={3}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          {isLoading ? (
            <Stack spacing={1} p={2}>
              <Stack width={'96%'} alignSelf={'flex-end'}>
            <Skeleton variant="rounded" width={'100%'} height={'50px'} />
              </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
            </Stack>
            <Stack direction={'row'} spacing={2}>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rectangular" width={'100%'} height={'50px'} />
            </Stack>
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {tableHeader.map((header) => (
                    <TableCell sx={themeStyle.tableCell} key={header.id}>
                      {header.title}
                    </TableCell>
                  ))}
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow>
                          <TableCell sx={themeStyle.tableCell}>
                            <img
                              src={`https://randomuser.me/api/portraits/${
                                Math.random() > 0.5 ? "men" : "women"
                              }/${Math.floor(Math.random() * 100)}.jpg`}
                              alt="profile"
                              style={{
                                borderRadius: "50%",
                                width: "50px", // Adjust the width and height as needed
                                height: "50px",
                              }}
                            />
                          </TableCell>
                          {tableHeader &&
                            tableHeader.map((column, index) => {
                              let value = row[column.id];
                              const status = column.id === "projectStatus";

                              return (
                                <TableCell
                                  key={value}
                                  sx={themeStyle.tableCell}
                                >
                                  <Typography
                                    sx={
                                      status
                                        ? value === "done"
                                          ? themeStyle.statusDone
                                          : themeStyle.statusPending
                                        : ""
                                    }
                                  >
                                    {value}
                                  </Typography>
                                </TableCell>
                              );
                            })}
                          <Box
                            display="flex"
                            pt={2.5}
                            gap={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <Paper>
                              <IconButton variant={"contained"}>
                                <EditOutlinedIcon
                                  style={{ color: "#4C8AB1" }}
                                />
                              </IconButton>
                            </Paper>
                            <Paper style={{ backgroundColor: "#FFDADA" }}>
                              <IconButton>
                                <DeleteOutlineOutlinedIcon
                                  style={{ color: "#DF0404" }}
                                />
                              </IconButton>
                            </Paper>
                            <Paper style={{ backgroundColor: "#E7E7E7" }}>
                              <IconButton>
                                <SaveAsOutlinedIcon
                                  style={{ color: "#545454" }}
                                />
                              </IconButton>
                            </Paper>
                          </Box>
                          <TableCell>
                            <Typography
                              color={"#4C8AB1"}
                              fontSize={"14px"}
                              pl={1}
                              width={"80px"}
                            >
                              View Details
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={paginationStyle}
          />
        </Stack>
        {/* <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          component={"div"}
          onPageChange={handlePageChange}
          count={rows.length}
          labelRowsPerPage={false}
          rowsPerPageOptions={[1]}
        ></TablePagination> */}
      </Stack>
    </Stack>
  );
};

export default ProjectList;

const themeStyle = {
  tableCell: {
    fontWeight: 500,
    fontSize: "14px",
    fontFamily: "Montserrat, sans serif",
    color: "#8C8C8C",
  },
  statusPending: {
    padding: "4px 8px 4px 8px",
    borderRadius: "28px",
    backgroundColor: "#FFC8C8",
    color: "#F03434",
    fontSize: "12px",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    width: "80px",
    textAlign: "center",
  },
  statusDone: {
    padding: "4px 8px 4px 8px",
    borderRadius: "28px",
    backgroundColor: "#16C09821",
    color: "#008767",
    fontSize: "12px",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    width: "80px",
    textAlign: "center",
  },
};

const paginationStyle = {
  "& .MuiPaginationItem-root": {
    border: "none",
    backgroundColor: "#EEEEEE",
    "&:hover": {
      backgroundColor: "#EEEEEE",
    },
  },
  "& .Mui-selected": {
    backgroundColor: "#FFAC00 !important", // Set background color for the selected page
    color: "#FFFFFF", // Text color for the selected page
  },
};
