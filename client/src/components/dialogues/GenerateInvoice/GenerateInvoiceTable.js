import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, rate,tax, amount) {
  const price = priceRow(qty, rate);
  return { desc, qty, rate, price, tax,amount };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Rebuild', 2, 100, 12, 200),
  createRow('Enter Item name/decription', 2, 0,0,0),
  createRow('Enter Item name/decription',2, 0,0, 0),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function GenerateInvoiceTable() {
  return (
    <TableContainer component={Paper} width={'100%'}>
      <Table  aria-label="spanning table">
        <TableHead sx={{backgroundColor:'black'}}>
          <TableRow>
            <TableCell  sx={{color:'white'}} >Item Desciption</TableCell>
            <TableCell  sx={{color:'white'}} align="right">Qty.</TableCell>
            <TableCell  sx={{color:'white'}} align="right">Rate</TableCell>
            <TableCell  sx={{color:'white'}} align="right">TAX</TableCell>
            <TableCell  sx={{color:'white'}} align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{color:'gray'}} >
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell >{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.tax}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} colSpan={2} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>TAX ({`${(TAX_RATE * 100).toFixed(0)} %`})</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow style={{backgroundColor:'ButtonHighlight'}}>
            <TableCell colSpan={2} >Total</TableCell>
            <TableCell align="right"> 
            <Typography style={{ display: 'inline-block', marginRight: '4px', backgroundColor:'peachpuff', width: '30px', border:'1px solid black', paddingRight:'2px' }}>$</Typography>
            <Typography style={{ display: 'inline-block'}}>{ccyFormat(invoiceTotal)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}