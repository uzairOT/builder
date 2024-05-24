import React from 'react';
import { Modal, Box, Typography, Table, TableBody, TableRow, TableCell, styled, Divider, TableHead, Button, Avatar } from '@mui/material';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledPaper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: '18px',
  borderRadius: '14px',
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14, // Adjust font size as needed
  fontWeight: 500,
  color: theme.palette.text.primary,
  borderBottom: '0px',
  margin:'4px',
  padding: '8px', // Adjust padding for better spacing
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontFamily: "Poppins, sans-serif",
  whiteSpace: "nowrap",
  fontWeight: 500,
  fontSize: "0.9rem",
  color: "#8C8C8C",
  padding:'8px', // Adjust padding for better spacing
}));

const StyledStatusCell = styled(StyledTableCell)(({ theme, status }) => ({
  textAlign: 'center',
  backgroundColor: status === 'pending' ? '#FFDADA' : '#16C09821',
  color: status === 'pending' ? '#DF0404' : '#008767',
  borderRadius: '28px',
  margin:'4px',
  padding: '8px', // Adjust padding for better alignment
}));

const LineItemTeamStatus = ({ modalOpen, setModalOpen, UserLineItemStatuses }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <StyledModal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledPaper>
          <Typography variant="h6" id="modal-modal-title">
            Team Status Details
          </Typography>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell></StyledTableHeaderCell>
                <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Email</StyledTableHeaderCell>
                <StyledTableHeaderCell>Role</StyledTableHeaderCell>
                <StyledTableHeaderCell>Status</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {/* <Divider /> */}
              {UserLineItemStatuses.map((user) => (
                <TableRow key={user.userId}>
                  <StyledTableCell><Avatar src={user.User.image} alt='Profile pic'></Avatar></StyledTableCell>
                  <StyledTableCell>
                    {user.User.firstName} {user.User.lastName}
                  </StyledTableCell>
                  <StyledTableCell>{user.User.email}</StyledTableCell>
                  <StyledTableCell>{user.User.ProjectMembers[0]?.role}</StyledTableCell>
                  <StyledTableCell ><Button sx={{borderRadius:'28px' , backgroundColor: user.status === 'pending' ? '#FFDADA' : '#16C09821',  color: user.status === 'pending' ? '#DF0404' : '#008767',}}>{user.status}</Button></StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledPaper>
      </StyledModal>
    </>
  );
};

export default LineItemTeamStatus;
