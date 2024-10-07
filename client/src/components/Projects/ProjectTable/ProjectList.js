import {
  Box,
  Button,
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
import { Link, useNavigate } from "react-router-dom";
import EditProjectModal from "../../dialogues/EditProject/EditProjectModal";
import moment from "moment-timezone";
import {
  useDeleteUserProjectMutation,
  useGetUserProjectsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import AreYouSureModal from "../../dialogues/AreYouSureModal/AreYouSureModal";
import { useDispatch } from "react-redux";
import {
  addProjects,
  setIsLoading,
  setLimit,
  setTotalCount,
  setTotalPages,
} from "../../../redux/slices/Project/userProjectsSlice";
import { setError } from "../../../redux/slices/Notifications/notificationSlice";
import { toast } from "react-toastify";

const ProjectList = ({
  rows,
  isLoading,
  totalPages,
  limit,
  totalCount,
  currentUserId,
}) => {
  const navigate = useNavigate();
  const [deleteProject, { isLoading: deletingProjectLoading }] =
    useDeleteUserProjectMutation();
  const dispatch = useDispatch();
  const tableHeader = [
    { id: "clientName", title: "Client" },
    { id: "projectName", title: "Project" },
    { id: "start_time", title: "Start Date" },
    { id: "end_time", title: "End Date" },
    // { id: "phoneNumber", title: "" },
    // { id: "approvedPrice", title: "" },
    // { id: "collected", title: "" },
    // { id: "remainingBalance", title: "" },
    // { id: "costToComplete", title: "" },
    // { id: "projectProfit", title: "" },
    // { id: "projectMargin", title: "" },
    // { id: "projectStatus", title: "" },
  ];
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [project, setProject] = useState(null);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectProjectId] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    refetch,
    data,
    isLoading: fetchingProjects,
    error,
    isSuccess,
  } = useGetUserProjectsQuery({
    userId: currentUserId,
    q: "",
    filter: "",
    page: 1,
  });

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
    setProject((prev) => row);
    setOpenEditModel(true);
  };
  const handleCloseEditModel = () => {
    setOpenEditModel(false);
  };

  const handleDeleteFlow = (projectId) => {
    setSelectProjectId(projectId);
    setOpenModal(true);
  };
  const handleOpenModalClose = () => {
    setOpenModal(false);
  };
  const handleConfirmDelete = (isDelete) => {
    if (isDelete) {
      handleDeleteProject(selectedProjectId);
    } else {
      handleOpenModalClose();
    }
  };
  const handleDeleteProject = async (id) => {
    try {
      const res = await deleteProject({
        id: id,
      });
      // console.log(res);
      if (res?.error?.data?.message) {
        toast.error(res?.error?.data?.message);
        return;
      }
      dispatch(setIsLoading(isLoading));
      const refetchRes = await refetch({
        userId: currentUserId,
        q: "",
        filter: "",
        page: 1,
      });
      // console.log("REFETCHED DATA: ", refetchRes);
      if (data) {
        dispatch(addProjects(data?.projects));
        dispatch(setTotalCount(data?.totalCount));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLimit(data?.limit));
      } else {
        dispatch(setError(error));
      }
    } catch (error) {
      console.log(error);
    }
    handleOpenModalClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    console.log("Filter open: ", open);

  }, [open]);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  let startIndex = 1;
  let endIndex = limit;
  if (page === 1) {
    startIndex = 1;
    if (totalCount < limit) {
      endIndex = totalCount;
    }
  } else {
    startIndex = 1 + limit * (page - 1);
    endIndex = limit * page;
    if (endIndex > totalCount) {
      endIndex = endIndex - totalCount;
      endIndex = startIndex + endIndex - 1;
    }
  }
  return (
    <Stack width={"100%"} height={"inherit"}>
      {/* Project List Header */}
      <Stack p={3}>
        {/* Project List Title */}
        <Stack
          direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "row",
            xs: "row",
          }}
          justifyContent={{
            xl: "space-between",
            lg: "space-between",
            md: "space-between",
            xs: "space-between",
            // xs: "flex-start",
          }}
          alignItems={{ xs: "flex-start" }}
          spacing={1}
        >
          <Stack pl={{ xl: 8, lg: 8, md: 8, sm: 1, xs: 1 }}>
            <Typography
              color={"#4C8AB1"}
              fontFamily={'var(--main-font-family)'}
              fontSize={{ md: "22px", xs: "18px" }}
              fontWeight={"600"}
            >
              Project List
            </Typography>
            <Typography
              color={"#4C8AB1"}
              fontFamily={'var(--main-font-family)'}
              fontSize={{ md: "14px", xs: "11px" }}
              fontWeight={"400"}
            >
              All projects are displayed here
            </Typography>
          </Stack>
          {/* Buttons Remodel And Filter */}
          <Stack direction={"row"} height={"35px"}>
            <Box display={{ md: "flex", xs: "none" }}>
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
                    fontFamily={'var(--main-font-family)'}
                    fontSize={"12px"}
                    fontWeight={"500"}
                  >
                    {filter}
                  </Typography>
                </BuilderProButton>
              ))}
            </Box>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#FFAC00"}
              Icon={FilterListIcon}
              fontFamily={'var(--main-font-family)'}
              fontSize={"12px"}
              handleOnClick={handleClick}
              marginLeft={"16px"}
            >
              <Typography
                fontSize={"14px"}
                display={{ md: "inline-block", xs: "none" }}
              >
                Filter
              </Typography>
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
                  onClick={() => {
                    if (selectedFilters.includes("remodel")) {
                      handleClickFeatureRemove("remodel");
                    } else {
                      handleClickFeature("remodel");
                    }
                  }}
                  variant={
                    selectedFilters.includes("remodel")
                      ? "contained"
                      : "outlined"
                  }
                >
                  <Typography
                    fontFamily={'var(--main-font-family)'}
                    fontSize={"12px"}
                    fontWeight={"500"}
                  >
                    Remodel
                  </Typography>
                </Button>
                <Button
                  onClick={() => {
                    if (selectedFilters.includes("newbuild")) {
                      handleClickFeatureRemove("newbuild");
                    } else {
                      handleClickFeature("newbuild");
                    }
                  }}
                  variant={
                    selectedFilters.includes("newbuild")
                      ? "contained"
                      : "outlined"
                  }
                >
                  <Typography
                    fontFamily={'var(--main-font-family)'}
                    fontSize={"12px"}
                    fontWeight={"500"}
                  >
                    New Build
                  </Typography>
                </Button>
                <Button
                  onClick={() => {
                    if (selectedFilters.includes("commercial")) {
                      handleClickFeatureRemove("commercial");
                    } else {
                      handleClickFeature("commercial");
                    }
                  }}
                  variant={
                    selectedFilters.includes("commercial")
                      ? "contained"
                      : "outlined"
                  }
                >
                  <Typography
                    fontFamily={'var(--main-font-family)'}
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
            xs: "row",
          }}
          spacing={1}
        >
          <Stack alignSelf={"flex-end"}>
            <SearchBar
              selectedTab={1}
              selectedFilters={selectedFilters}
              page={page}
              setPage={setPage}
              projectsPage={true}
            />
          </Stack>
          <Stack
            width={{ xl: "150px", lg: "150px", md: "150px", sm: "150px" }}
            justifyContent={"flex-end"}
            alignSelf={"center"}
          >
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#FFAC00"}
              fontFamily={'var(--main-font-family)'}
              fontSize={"12px"}
              marginLeft={"0px"}
              handleOnClick={() => {
                navigate("/assignproject");
              }}
              // disabled={open}
            >
              Add{" "}
              <Box
                component={"span"}
                sx={{
                  display: { md: "inline-block", xs: "none" },
                  marginLeft: { md: "3px", xs: "0px" },
                }}
              >
                New
              </Box>
            </BuilderProButton>
          </Stack>
        </Stack>
      </Stack>
      {/* Table */}
      <Stack px={3} height={"calc(92vh - 240px)"}>
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
                  <TableCell
                    sx={themeStyle.tableCell}
                    style={{ borderBottom: "1px solid #A1A1A1" }}
                  >
                    Profile Picture
                  </TableCell>
                  {tableHeader.map((header) => (
                    <TableCell
                      sx={themeStyle.tableCell}
                      style={{ borderBottom: "1px solid #A1A1A1" }}
                      key={header.id}
                    >
                      {header.title}
                    </TableCell>
                  ))}
                  <TableCell
                    sx={themeStyle.tableCell}
                    style={{ borderBottom: "1px solid #A1A1A1" }}
                  >
                    Action
                  </TableCell>
                  <TableCell
                    sx={themeStyle.tableCell}
                    style={{ borderBottom: "1px solid #A1A1A1" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row, index) => {
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    return (
                      <TableRow>
                        <TableCell sx={themeStyle.tableCell}>
                          <img
                            src={row.image ? row.image : logo}
                            alt="profile"
                            style={{
                              borderRadius: "50%",
                              width: "50px", // Adjust the width and height as needed
                              height: "50px",
                              objectFit: "scale-down",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={themeStyle.tableCell}>
                          {row.clientName ? row.clientName : "No Client Name"}
                        </TableCell>
                        <TableCell sx={themeStyle.tableCell}>
                          {row.projectName}
                        </TableCell>
                        <TableCell sx={themeStyle.tableCell}>
                          {moment(row.start_time).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell sx={themeStyle.tableCell}>
                          {moment(row.end_time).format("MM/DD/YYYY")}
                        </TableCell>
                        {/* {tableHeader &&
                            tableHeader.map((column, index) => {
                              const value = row[column.id];
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
                            })} */}
                        <TableCell sx={themeStyle.tableCell}>
                          <Box
                            display="flex"
                            pt={2.5}
                            gap={1}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                          >
                            {row.userId === currentUserId && (
                              <Paper>
                                <IconButton
                                  
                                  variant={"contained"}
                                  onClick={() => handleOpenEditModel(row)}
                                >
                                  <EditOutlinedIcon
                                  sx={{fontSize:{md:'20px', xs:'14px'}}}
                                    style={{ color: "#4C8AB1" }}
                                  />
                                </IconButton>
                              </Paper>
                            )}
                            {row.userId === currentUserId && (
                              <Paper style={{ backgroundColor: "#FFDADA" }}>
                                <IconButton
                                  onClick={() => handleDeleteFlow(row.id)}
                                >
                                  <DeleteOutlineOutlinedIcon
                                   sx={{fontSize:{md:'20px', xs:'14px'}}}
                                    style={{ color: "#DF0404" }}
                                  />
                                </IconButton>
                              </Paper>
                            )}
                            {/* <Paper style={{ backgroundColor: "#E7E7E7" }}>
                              <IconButton>
                                <SaveAsOutlinedIcon
                                  style={{ color: "#545454" }}
                                />
                              </IconButton>
                            </Paper> */}
                          </Box>
                        </TableCell>
                        <TableCell sx={themeStyle.tableCell}>
                          <Link
                            to={`/projects/${row.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              color={"#4C8AB1"}
                              fontSize={"14px"}
                              pl={1}
                              width={"80px"}
                            >
                              View Details
                            </Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Stack>
      <Stack pl={1}>
        <Typography variant="body1" sx={paginationTextStyle}>
          Showing data {startIndex} to {endIndex} of {totalCount} entries
        </Typography>
      </Stack>
      <Stack justifyContent={"flex-end"} alignItems={"flex-end"} p={1}>
        <Pagination
          size="small"
          count={totalPages}
          variant="outlined"
          shape="rounded"
          sx={paginationStyle}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
      <EditProjectModal
        project={project}
        open={openEditModel}
        onClose={handleCloseEditModel}
        page={page}
      />
      <AreYouSureModal
        open={openModal}
        handleClose={handleOpenModalClose}
        handleConfirmDelete={handleConfirmDelete}
        isLoading={deletingProjectLoading}
        text={"project"}
      />
    </Stack>
  );
};

export default ProjectList;

const themeStyle = {
  tableCell: {
      fontFamily: 'var(--main-font-family)',
    maxWidth: { xl: "40px", lg: "30px", md: "70px", xs: "100%" },
    minWidth: { xl: "20px", lg: "20px", md: "40px", xs: "20px" },
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontWeight: 500,
    fontSize: { md: "14px", xs: "11px" },
    color: "#8C8C8C",
    padding: "4px",
    border: "none",
  },
  statusPending: {
    padding: "4px 8px 4px 8px",
    borderRadius: "28px",
    backgroundColor: "#FFC8C8",
    color: "#F03434",
    fontSize: "12px",
    fontFamily: 'var(--main-font-family)',
    width: "80px",
    textAlign: "center",
  },
  statusDone: {
    padding: "4px 8px 4px 8px",
    borderRadius: "28px",
    backgroundColor: "#16C09821",
    color: "#008767",
    fontSize: "12px",
    fontFamily: 'var(--main-font-family)',
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

const paginationTextStyle = {
  display: {
    xs: "none",
    md: "block",
  },
  fontWeight: 400,
  fontSize: "14px",
  fontFamily: 'var(--main-font-family)',
  color: "#8C8C8C",
};
