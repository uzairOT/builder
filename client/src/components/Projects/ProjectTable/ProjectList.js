import {
  Box,
  Button,
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
import logo from "../../Signup/Assets/pngs/builderProYellowLogo.png";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchBar from "../../UI/SearchBar/SearchBar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { useNavigate } from "react-router-dom";
import EditProjectModal from "../../dialogues/EditProject/EditProjectModal";

const ProjectList = ({ rows, isLoading, setSelectedFilters, selectedFilters }) => {
  const navigate = useNavigate();
  const tableHeader = [
    { id: "clientName", title: "Client" },
    { id: "projectName", title: "Project" },
    { id: "phoneNumber", title: "Phone Number" },
    { id: "approvedPrice", title: "Approved Price" },
    { id: "collected", title: "Collected" },
    { id: "remainingBalance", title: "Remaining Balance" },
    { id: "costToComplete", title: "Cost To Complete" },
    { id: "projectProfit", title: "Projected Profit" },
    { id: "projectMargin", title: "Projected Margin" },
    { id: "projectStatus", title: "Project Status" },
  ];
  //console.log(rows);
  const [project, setProject] = useState(null);

  const [page, setPage] = useState(0);
  const [openEditModel, setOpenEditModel] = useState(false);

  const rowsPerPage = 6;
  const [anchorEl, setAnchorEl] = React.useState(null);
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickFeature = (filter) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleClickFeatureRemove = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };
  const handleOpenEditModel = (row) => {
    setProject(prev => row);
    setOpenEditModel(true);
  };
  const handleCloseEditModel = () => {
    setOpenEditModel(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

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
  console.log(rows);
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
            {selectedFilters?.map((filter) => (
              <BuilderProButton
                variant={"contained"}
                backgroundColor={"#E7E7E7"}
                Icon={CloseIcon}
                iconProps={{ color: "#272727" }}
                handleOnClick={() => {
                  handleClickFeatureRemove(filter);
                }}
              >
                <Typography
                  color={"#272727"}
                  fontFamily={"Inter, sans serif"}
                  fontSize={"12px"}
                  fontWeight={"500"}
                >
                  {filter}
                </Typography>
              </BuilderProButton>
            ))}
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
                  sx: {},
                },
              }}
            >
              <Stack p={1} borderRadius={"14px"} spacing={1}>
                <Button
                  onClick={() => handleClickFeature("Remodel")}
                  variant={
                    selectedFilters.includes("Remodel")
                      ? "contained"
                      : "outlined"
                  }
                >
                  <Typography
                    fontFamily={"Inter, sans serif"}
                    fontSize={"12px"}
                    fontWeight={"500"}
                  >
                    Remodel
                  </Typography>
                </Button>
                <Button
                  onClick={() => handleClickFeature("New Build")}
                  variant={
                    selectedFilters.includes("New Build")
                      ? "contained"
                      : "outlined"
                  }
                >
                  <Typography
                    fontFamily={"Inter, sans serif"}
                    fontSize={"12px"}
                    fontWeight={"500"}
                  >
                    New Build
                  </Typography>
                </Button>
                <Button
                  onClick={() => handleClickFeature("Commercial")}
                  variant={
                    selectedFilters.includes("Commercial")
                      ? "contained"
                      : "outlined"
                  }
                >
                  <Typography
                    fontFamily={"Inter, sans serif"}
                    fontSize={"12px"}
                    fontWeight={"500"}
                  >
                    Commercial
                  </Typography>
                </Button>
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
              handleOnClick={() => {
                navigate("/assignproject");
              }}
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
              <Stack width={"96%"} alignSelf={"flex-end"}>
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton variant="rounded" width={"100%"} height={"50px"} />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"50px"}
                />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"50px"}
                />
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Skeleton variant="circular" width={50} height={50} />
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"50px"}
                />
              </Stack>
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={themeStyle.tableCell} style={{borderBottom: '1px solid #A1A1A1'}}></TableCell>
                  {tableHeader.map((header) => (
                    <TableCell sx={themeStyle.tableCell} style={{borderBottom: '1px solid #A1A1A1'}} key={header.id}>
                      {header.title}
                    </TableCell>
                  ))}
                  <TableCell sx={themeStyle.tableCell} style={{borderBottom: '1px solid #A1A1A1'}}></TableCell>
                  <TableCell sx={themeStyle.tableCell} style={{borderBottom: '1px solid #A1A1A1'}}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow >
                          <TableCell sx={themeStyle.tableCell}>
                            <img
                              src={row.image ? row.image : logo}
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
                              <IconButton
                                variant={"contained"}
                                onClick={() => handleOpenEditModel(row)}
                              >
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
                          <TableCell sx={themeStyle.tableCell}>
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
                  <TableRow sx={themeStyle.tableCell} style={{ height: 60 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Stack justifyContent={"flex-end"} alignItems={"flex-end"}>
          {/* <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={paginationStyle}
          /> */}
        </Stack>
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          component={"div"}
          onPageChange={handlePageChange}
          count={isLoading ?  0 : rows.length}
          labelRowsPerPage={true}
          rowsPerPageOptions={[1]}
        ></TablePagination>
      </Stack>
      <EditProjectModal
        project={project}
        open={openEditModel}
        onClose={handleCloseEditModel}
      />
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
    padding: '4px',
    border: 'none'
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
