import React from 'react'
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Tab,
    Typography, 
} from '@mui/material'


const ChangeOrder = () => {

    const data = [
        {
          id: 1,
          "LineItem": "Demolition",
          "Status": "Pending",
          "Total": 50000,
          "Start": "2024/03/01",
          "End": "-",
          "Member": "Client"
        },
        {
          id: 2,
          "LineItem": "Rebuild",
          "Status": "Pending",
          "Total": 75000,
          "Start": "2024/04/15",
          "End": "2024/06/30",
          "Member": "Admin"
        },
        {
          id: 3,
          "LineItem": "New Build",
          "Status": "Pending",
          "Total": 100000,
          "Start": "2024/05/30",
          "End": "-",
          "Member": "Team"
        },
        {
          id: 4,
          "LineItem": "Renovation",
          "Status": "Pending",
          "Total": 60000,
          "Start": "2024/06/10",
          "End": "2024/08/15",
          "Member": "Client"
        },
        {
          id: 5,
          "LineItem": "Infrastructure Upgrade",
          "Status": "Pending",
          "Total": 120000,
          "Start": "2024/07/20",
          "End": "-",
          "Member": "Admin"
        },
        {
          id: 6,
          "LineItem": "Interior Design",
          "Status": "Pending",
          "Total": 90000,
          "Start": "2024/08/05",
          "End": "-",
          "Member": "Team"
        },
        {
          id: 7,
          "LineItem": "Landscaping",
          "Status": "Pending",
          "Total": 80000,
          "Start": "2024/09/15",
          "End": "2024/11/30",
          "Member": "Client"
        },
        {
          id: 8,
          "LineItem": "Renovation",
          "Status": "Pending",
          "Total": 95000,
          "Start": "2024/10/01",
          "End": "-",
          "Member": "Admin"
        }
      ];
       
;

  return (
    <TableContainer style={{paddingLeft:'4px', paddingRight: '4px'}}>
        <Table  size="small" aria-label='Change Order Table'>
            <TableHead>
                <TableRow >
                    <TableCell sx={themeStyle.tableHeader}>Line Item</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Status</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Total</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Start</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>End</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Member</TableCell>
                </TableRow>
            </TableHead>
            <TableBody style={{paddingLeft:'4px', paddingRight: '4px'}}>
                {
                    data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={themeStyle.tableBody}>{row.LineItem}</TableCell>
                            <TableCell sx={{...themeStyle.tableBody}}>
                                <Typography p={"4px 8px 4px 8px"} borderRadius={'28px'} sx={{backgroundColor:'#FFC8C8', color:'#F03434'}} fontSize={'12px'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} >
                                {row.Status}
                                </Typography>
                                </TableCell>
                            <TableCell sx={themeStyle.tableBody}>{row.Total}</TableCell>
                            <TableCell sx={{...themeStyle.tableBody,}}>{row.Start}</TableCell>
                            <TableCell sx={{...themeStyle.tableBody}}>{row.End}</TableCell>
                            <TableCell sx={themeStyle.tableBody}>{row.Member}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ChangeOrder

const themeStyle= {
    tableHeader: {
        fontSize: '12px',
        fontFamily: "Poppins, sans-serif",
        color: '#5B5B5B'
    },
    tableBody:{
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#000000',
        padding: '8px 4px 4px 4px',
        
    }
}