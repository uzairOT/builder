import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { useGetTeamMembersQuery } from "../../../redux/apis/Project/projectApiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "14px",
};

const themeStyle = {
  AvatarStyle: {
    width: 30,
    height: 30,
  },
};

const AssignTeamMembers = ({ setAssignedCheckboxes, assignedCheckboxes }) => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  console.log("location: ", location, " projectId: ", projectId);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useGetTeamMembersQuery(projectId);
  const team = data?.team;
  console.log(data?.team[0]);

  const handleEmailCheckBoxes = (event, row) => {
    const { checked } = event.target;
    const { userId } = row;

    if (checked) {
      setAssignedCheckboxes([...assignedCheckboxes, userId]);
    } else {
      setAssignedCheckboxes(
        assignedCheckboxes.filter(
          (assignedCheckbox) => assignedCheckbox !== userId
        )
      );
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="Assign Team Members">
        <AddCircleOutlineIcon
          sx={{ ...themeStyle.AvatarStyle, color: "#A8A8A8" }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assign Users
          </Typography>
          <Divider />
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!team ? (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>No Team Members</TableCell>
                  </TableRow>
                ) : (
                  team?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          checked={assignedCheckboxes.includes(row.userId)}
                          onChange={(event) =>
                            handleEmailCheckBoxes(event, row)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {row.firstName} {row.lastName}
                      </TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AssignTeamMembers;
