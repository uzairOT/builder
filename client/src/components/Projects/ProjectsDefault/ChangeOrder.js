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
import { useGetProjectChangeOrderQuery } from '../../../redux/apis/Project/projectApiSlice';
import { useParams } from 'react-router-dom'


const ChangeOrder = () => {
  const params = useParams();
  const {id: currentProjectId} = params;
  const currentUser = localStorage.getItem('userInfo');
  const user = JSON.parse(currentUser);
  console.log(user);
  const {data} = useGetProjectChangeOrderQuery({projectId: currentProjectId, userId: user.user.id})
  console.log(data);

  const data1 = [
    {
      id: 1,
      lineItem: "Demolition",
      unit: "sq. ft",
      quantity: 100,
      unitCost: 50,
      totalCost: 5000.0,
      start: "2024/03/01",
      end: "-",
      assignedTo: "Client",
      notes: "Lorem ipsum dolor sit amet"
    },
    {
      id: 2,
      lineItem: "Rebuild",
      unit: "sq. ft",
      quantity: 150,
      unitCost: 60,
      totalCost: 9000.0,
      start: "2024/04/15",
      end: "2024/06/30",
      assignedTo: "Admin",
      notes: "Lorem ipsum dolor sit amet"
    },
    {
      id: 3,
      lineItem: "New Construction",
      unit: "sq. ft",
      quantity: 200,
      unitCost: 70,
      totalCost: 14000.0,
      start: "2024/05/30",
      end: "-",
      assignedTo: "Team",
      notes: "Lorem ipsum dolor sit amet"
    },
    {
      id: 4,
      lineItem: "Renovation",
      unit: "sq. ft",
      quantity: 120,
      unitCost: 55,
      totalCost: 6600.0,
      start: "2024/06/10",
      end: "2024/08/15",
      assignedTo: "Client",
      notes: "Lorem ipsum dolor sit amet"
    },
    {
      id: 5,
      lineItem: "Infrastructure Upgrade",
      unit: "unit",
      quantity: 10,
      unitCost: 100,
      totalCost: 1000.0,
      start: "2024/07/20",
      end: "-",
      assignedTo: "Admin",
      notes: "Lorem ipsum dolor sit amet"
    },
    {
      id: 6,
      lineItem: "Interior Design",
      unit: "room",
      quantity: 5,
      unitCost: 200,
      totalCost: 1000.0,
      start: "2024/08/05",
      end: "-",
      assignedTo: "Team",
      notes: "Lorem ipsum dolor sit amet"
    },
    {
      id: 7,
      lineItem: "Landscaping",
      unit: "acre",
      quantity: 2,
      unitCost: 4000,
      totalCost: 8000.0,
      start: "2024/09/15",
      end: "2024/11/30",
      assignedTo: "Client",
      notes: "Lorem ipsum dolor sit amet"
    }
  ];
  
;

  return (
    <TableContainer style={{paddingLeft:'4px', paddingRight: '4px', width:'100%'}}>
        <Table  size="small" aria-label='Change Order Table'>
            <TableHead>
                <TableRow >
                    <TableCell sx={themeStyle.tableHeader}>Line Item</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Unit</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Quantity</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Unit Cost</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Total Cost</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Start</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>End</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Assigned to</TableCell>
                    <TableCell sx={themeStyle.tableHeader}>Notes</TableCell>
                </TableRow>
            </TableHead>
            <TableBody style={{paddingLeft:'4px', paddingRight: '4px'}}>
                {
                    data1.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={themeStyle.tableBody}>{row.lineItem}</TableCell>
                            <TableCell sx={{...themeStyle.tableBody}}>
                                {/* <Typography p={"4px 8px 4px 8px"} borderRadius={'28px'} sx={{backgroundColor:'#FFC8C8', color:'#F03434'}} fontSize={'12px'} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} > */}
                                {row.unit}
                                {/* </Typography> */}
                                </TableCell>
                            <TableCell sx={themeStyle.tableBody}>US${row.quantity}</TableCell>
                            <TableCell sx={{...themeStyle.tableBody,}}>{row.unitCost}</TableCell>
                            <TableCell sx={{...themeStyle.tableBody}}>{row.totalCost}</TableCell>
                            <TableCell sx={themeStyle.tableBody}>{row.start}</TableCell>
                            <TableCell sx={themeStyle.tableBody}>{row.end}</TableCell>
                            <TableCell sx={themeStyle.tableBody}>{row.assignedTo}</TableCell>
                            <TableCell sx={{ ...themeStyle.tableBody, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.notes}</TableCell>

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
        color: '#5B5B5B',
        whiteSpace:'nowrap'
    },
    tableBody:{
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#000000',
        padding: '8px 4px 4px 4px',
        
    }
}