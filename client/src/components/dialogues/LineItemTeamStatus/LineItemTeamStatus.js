import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  styled,
  TableHead,
  Button,
  Avatar
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const StyledModal = styled(Modal)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px'
}));

const StyledPaper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: '18px',
  borderRadius: '14px',
  maxWidth: '90vw', // Ensures modal fits smaller screens
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '60vw' // Larger modals on bigger screens
  }
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 600,
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%' // Ensures it fits smaller screens
  }
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'var(--main-font-family)',
  whiteSpace: 'nowrap',
  fontWeight: 500,
  fontSize: '0.9rem',
  color: '#8C8C8C',
  padding: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem', // Smaller text on mobile
    padding: '6px'
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
  borderBottom: '0px',
  padding: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: '6px'
  }
}));

const StyledStatusButton = styled(Button)(({ theme, status }) => ({
  borderRadius: '28px',
  backgroundColor: status === 'pending' ? '#FFDADA' : '#16C09821',
  color: status === 'pending' ? '#DF0404' : '#008767',
  fontSize: '0.8rem',
  padding: '6px 12px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
    padding: '4px 8px' // Smaller padding for mobile
  }
}));

const LineItemTeamStatus = ({ modalOpen, setModalOpen, UserLineItemStatuses }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <StyledModal open={modalOpen} onClose={handleClose} aria-labelledby="modal-title">
      <StyledPaper>
        <Typography variant="h6" id="modal-title" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {t("LineItemTeamStatus.title1")}
        </Typography>
        <TableContainer sx={{ maxHeight: '60vh' }}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell></StyledTableHeaderCell>
                <StyledTableHeaderCell>{t("LineItemTeamStatus.table.title1")}</StyledTableHeaderCell>
                <StyledTableHeaderCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  {t("LineItemTeamStatus.table.title2")}
                </StyledTableHeaderCell>
                <StyledTableHeaderCell>{t("LineItemTeamStatus.table.title3")}</StyledTableHeaderCell>
                <StyledTableHeaderCell>{t("LineItemTeamStatus.table.title4")}</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {UserLineItemStatuses.map((user) => {
                const isSuperAdmin = user.User.ProjectMembers[0]?.role === 'superadmin';
                if (isSuperAdmin) return null;

                return (
                  <TableRow key={user.userId}>
                    <StyledTableCell>
                      <Avatar
                        src={user.User.image}
                        alt="Profile pic"
                        sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {user.User.firstName} {user.User.lastName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {user.User.email}
                    </StyledTableCell>
                    <StyledTableCell>
                      {t(`ProjectPermissions.roles.${user.User.ProjectMembers[0]?.role}`)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <StyledStatusButton status={user.status}>
                        {t(`LineItemTeamStatus.table.${user.status}`)}
                      </StyledStatusButton>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </StyledPaper>
    </StyledModal>
  );
};

export default LineItemTeamStatus;
