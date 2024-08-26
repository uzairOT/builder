import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import loader from "./assets/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";
import Header from "../../Settings/Header/Header";
import { useGetProjectPermssionsListMutation } from "../../../redux/apis/Permissions/permissionsApiSlice";
import { useGetProjectDataQuery } from "../../../redux/apis/Project/projectApiSlice";
import { useParams } from "react-router-dom";

const formatRoleName = (role) => {
  return role
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const ProjectsPermissionAccess = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const { id: currentProjectId } = params;
  const { data } = useGetProjectDataQuery({ projectId: currentProjectId });
  const [permissionList, setPermissionsList] = useState([]);
  const [GetPermissionsList] = useGetProjectPermssionsListMutation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const currentUser = userInfo?.user;
  const roles = [
    "admin",
    "projectManager",
    "client",
    "employee",
    "subcontractor",
    "supplier",
    "others",
  ];

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setDataLoading(true);
        const response = await GetPermissionsList({ projectId: currentProjectId }).unwrap();
        setPermissionsList(response);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchPermissions();
  }, [GetPermissionsList, currentProjectId]);

  const handleCheckboxChange = (permissionId, role, index) => {
    setLoading(true);
    setModalOpen(true);
    const updatedList = [...permissionList];
    const permission = updatedList[index];
    const updatedValue = !permission.roles[role];

    socket.emit("permission-req-update", {
      projectId: currentProjectId,
      permissionId: permission.permissionId,
      role,
      value: updatedValue,
    });

    setTimeout(() => {
      setPermissionsList(prevList => {
        updatedList[index] = {
          ...permission,
          roles: {
            ...permission.roles,
            [role]: updatedValue,
          },
        };
        return updatedList;
      });
      setLoading(false);
      setSnackbarMessage(
        updatedValue
          ? "Permission enabled successfully!"
          : "Permission disabled successfully!"
      );
      setSnackbarOpen(true);
      setModalOpen(false);
    }, 2000);
  };

  useEffect(() => {
    const handlePermissionsUpdate = (data) => {
      // Handle socket event for permissions update
    };

    socket.on("organization-permissions-updated", handlePermissionsUpdate);

    return () => {
      socket.off("organization-permissions-updated", handlePermissionsUpdate);
    };
  }, []);

  const filteredPermissions = permissionList.filter((permission) => {
    const matchesPermissionName = permission.permission.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return matchesPermissionName;
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Grid p={1}>
        <Header
          title="Project Permissions"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          OpenAddModal={() => {}}
        />
      </Grid>
      <TableContainer sx={{ padding: 1 }}>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "separate",
            borderSpacing: "0px 0px",
            padding: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: "1px solid #DCDCDC",
                  margin: 5,
                  width: 250,
                }}
              ></TableCell>
              {roles.map((role) => (
                <TableCell
                  key={`header-${role}`}
                  align="center"
                  sx={{
                    borderBottom: "1px solid #DCDCDC",
                    color: "#333",
                    fontWeight: "bold",
                    width: 150,
                  }}
                >
                  {formatRoleName(role)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataLoading ? (
              <TableRow>
                <TableCell colSpan={roles.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredPermissions.map((permission, index) => {
                const { permissionId, roles: permissionRoles, permission: perm } = permission;

                return (
                  <TableRow
                    key={permissionId}
                    sx={{
                      "&:last-child td, &:last-child th": { borderBottom: 0 },
                    }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #DCDCDC",
                        borderRight: "1px solid #DCDCDC",
                        fontWeight: "bold",
                        color: "#8C8C8C",
                        padding: "16px 0 16px 16px",
                        width: 250,
                      }}
                    >
                      {perm.name}
                    </TableCell>
                    {roles.map((role) => (
                      <TableCell
                        key={`${permissionId}-${role}`}
                        align="center"
                        sx={{
                          borderBottom: "1px solid #DCDCDC",
                          padding: "16px",
                          width: 150,
                        }}
                      >
                        <Checkbox
                          checked={permissionRoles[role] || false}
                          onChange={() => handleCheckboxChange(permissionId, role, index)}
                          sx={{
                            "&.Mui-checked": {
                              color: "#4C8AB1",
                            },
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "22px",
            color: "#4C8AB1",
          }}
        >
          Permission Update
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100px" }}
            >
              <img src={loader} alt="Loading" />
              <Typography variant="h6" style={{ marginTop: "16px" }}>
                Applying permission, please wait...
              </Typography>
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100px" }}
            >
              <Typography variant="h6" color="success.main">
                {snackbarMessage}
              </Typography>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProjectsPermissionAccess;
