// import React, { useEffect, useState } from "react";
// import {
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   CircularProgress,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import Header from "../Header/Header";
// import loader from "./assets/loader.gif";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setPermissionsState,
//   updatePermission,
// } from "../../../redux/slices/Permissions/permissionsSlice";
// import { socket } from "../../../socket";
// import { useGetPermssionsMutation } from "../../../redux/apis/Permissions/permissionsApiSlice";

// const formatRoleName = (role) => {
//   return role
//     .replace(/([A-Z])/g, " $1")
//     .replace(/^./, (str) => str.toUpperCase());
// };

// const PermissionAccess = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [loading, setLoading] = useState(false); 
//   const [dataLoading, setDataLoading] = useState(true); 
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [modalOpen, setModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const organizationId = useSelector((state) => state.organizationId);
//   const permissionsState = useSelector(
//     (state) => state.permissions.permissions
//   );
//   const [GetPermissionsList] = useGetPermssionsMutation();
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const currentUser = userInfo?.user;
//   const roles = [
//     "admin",
//     "projectManager",
//     "client",
//     "employee",
//     "subcontractor",
//     "supplier",
//     "others",
//   ];

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         setDataLoading(true);
//         const response = await GetPermissionsList({ organizationId }).unwrap();
//         const initialPermissionsState = response.permissions.reduce(
//           (acc, permission) => {
//             acc[permission.permission.name] = {
//               roles: roles.reduce((roleAcc, role) => {
//                 roleAcc[role] = permission.roles[role] || false;
//                 return roleAcc;
//               }, {}),
//               permissionId: permission.permissionId,
//             };
//             return acc;
//           },
//           {}
//         );
//         dispatch(setPermissionsState(initialPermissionsState));
//       } catch (error) {
//         console.error("Failed to fetch permissions:", error);
//       } finally {
//         setDataLoading(false);
//       }
//     };

//     fetchPermissions();
//   }, [dispatch, GetPermissionsList, organizationId]);

//   const handleCheckboxChange = (permissionName, role) => {
//     setLoading(true);
//     setModalOpen(true);

//     const updatedValue = !permissionsState[permissionName]?.roles?.[role];
//     const permissionId = permissionsState[permissionName]?.permissionId;

//     socket.emit("permission-req-update", {
//       userId: currentUser?.id,
//       permissionId,
//       role,
//       value: updatedValue,
//     });

//     dispatch(
//       updatePermission({
//         permission: permissionName,
//         role,
//         value: updatedValue,
//       })
//     );

//     setTimeout(() => {
//       setLoading(false);
//       setSnackbarMessage(
//         updatedValue
//           ? "Permission enabled successfully!"
//           : "Permission disabled successfully!"
//       );
//       setSnackbarSeverity(updatedValue ? "success" : "error");
//       setSnackbarOpen(true);
//       setModalOpen(false);
//     }, 3000);
//   };

//   useEffect(() => {
//     const handlePermissionsUpdate = (data) => {
//       const { permissionId, role, value } = data;
//       const permissionName = Object.keys(permissionsState).find(
//         (name) => permissionsState[name].permissionId === permissionId
//       );

//       if (permissionName) {
//         dispatch(updatePermission({ permission: permissionName, role, value }));
//       }
//     };

//     socket.on("organization-permissions-updated", handlePermissionsUpdate);

//     return () => {
//       socket.off("organization-permissions-updated", handlePermissionsUpdate);
//     };
//   }, [dispatch, permissionsState]);

//   const filteredPermissions = Object.keys(permissionsState).filter(
//     (permissionName) => {
//       const matchesPermissionName = permissionName
//         .toLowerCase()
//         .includes(searchInput.toLowerCase());
    
//       return matchesPermissionName;
//     }
//   );

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <>
//       <Grid p={1}>
//         <Header
//           title="Permission Access"
//           searchInput={searchInput}
//           setSearchInput={setSearchInput}
//           OpenAddModal={() => {}}
//         />
//       </Grid>
//       <TableContainer sx={{ padding: 1 }}>
//         <Table
//           sx={{
//             minWidth: 650,
//             borderCollapse: "separate",
//             borderSpacing: "0px 0px",
//             padding: 2,
//           }}
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell
//                 sx={{
//                   borderBottom: "1px solid #DCDCDC",
//                   margin: 5,
//                   width: 250,
//                 }}
//               ></TableCell>
//               {roles.map((role) => (
//                 <TableCell
//                   key={`header-${role}`}
//                   align="center"
//                   sx={{
//                     fontFamily: 'var(--main-font-family)',
//                     borderBottom: "1px solid #DCDCDC",
//                     color: "#333",
//                     fontWeight: "bold",
//                     width: 150,
//                   }}
//                 >
//                   {formatRoleName(role)}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {dataLoading ? (
//               <TableRow>
//                 <TableCell colSpan={roles.length + 1} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredPermissions.map((permissionName) => (
//                 <TableRow
//                   key={permissionsState[permissionName].permissionId}
//                   sx={{
//                     "&:last-child td, &:last-child th": { borderBottom: 0 },
//                   }}
//                 >
//                   <TableCell
//                     sx={{
//                       borderBottom: "1px solid #DCDCDC",
//                       borderRight: "1px solid #DCDCDC",
//                       fontFamily: 'var(--main-font-family)',
//                       fontWeight: "bold",
//                       color: "#8C8C8C",
//                       padding: "16px 0 16px 16px",
//                       width: 250,
//                     }}
//                   >
//                     {permissionName}
//                   </TableCell>
//                   {roles.map((role) => (
//                     <TableCell
//                       key={`${permissionsState[permissionName].permissionId}-${role}`}
//                       align="center"
//                       sx={{
//                         fontFamily: 'var(--main-font-family)',
//                         borderBottom: "1px solid #DCDCDC",
//                         padding: "16px",
//                         width: 150,
//                       }}
//                     >
//                       <Checkbox
//                         checked={
//                           permissionsState[permissionName]?.roles?.[role] || false
//                         }
//                         onChange={() =>
//                           handleCheckboxChange(permissionName, role)
//                         }
//                         sx={{
//                           "&.Mui-checked": {
//                             color: "#4C8AB1",
//                           },
//                         }}
//                       />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={modalOpen} onClose={handleCloseModal}>
//         <DialogTitle
//           sx={{
//             fontFamily: 'var(--main-font-family)',
//             fontWeight: "600",
//             fontSize: "22px",
//             color: "#4C8AB1",
//           }}
//         >
//           Permission Update
//         </DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <Grid
//               container
//               direction="column"
//               alignItems="center"
//               justifyContent="center"
//               style={{ minHeight: "100px" }}
//             >
//               <img src={loader} alt="Loading" />
//               <Typography variant="h6" style={{ marginTop: "16px" }}>
//                 Applying permission, please wait...
//               </Typography>
//             </Grid>
//           ) : (
//             <Grid
//               container
//               direction="column"
//               alignItems="center"
//               justifyContent="center"
//               style={{ minHeight: "100px" }}
//             >
//               <Typography variant="h6" color="success.main">
//                 {snackbarMessage}
//               </Typography>
//             </Grid>
//           )}
//         </DialogContent>
//       </Dialog>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default PermissionAccess;
