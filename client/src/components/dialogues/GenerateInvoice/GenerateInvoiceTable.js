import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, rate, tax, amount) {
  const price = priceRow(qty, rate);
  return { desc, qty, rate, price, tax, amount };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Rebuild", 2, 100, 12, 200),
  createRow("Enter Item name/decription", 2, 0, 0, 0),
  createRow("Enter Item name/decription", 2, 0, 0, 0),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function GenerateInvoiceTable({
  invoiceData,
}) {
  let totalCost = 0;
  console.log(invoiceData);

  return (
    <TableContainer component={Paper} width={"100%"}>
      <Table aria-label="spanning table" sx={{ padding: "10px" }}>
        <TableHead sx={{ backgroundColor: "black" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Item Name</TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Qty.
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Rate
            </TableCell>
            {/* <TableCell sx={{ color: "white" }} align="right">
              PR
            </TableCell> */}
            <TableCell sx={{ color: "white" }} align="right">
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ color: "gray", height:'150px' }}>
          {invoiceData?.invoiceCompleteObj?.InvoiceLineItems.map((lineItem, index) =>{
            // phase.rows.map((row) => {
              totalCost =
                totalCost + parseFloat(lineItem.totalAmount)
                // parseFloat(invoiceData?.invoiceCompleteObj?.InvoiceLineItems[index]
                //   ?.totalAmount);
              return (
                <>
                  <TableRow key={lineItem.LineItem.id}>
                    <TableCell>{lineItem.LineItem.title}</TableCell>
                    <TableCell align="right">{lineItem.LineItem.quantity}</TableCell>
                    <TableCell align="right">{lineItem.LineItem.unit_price}</TableCell>
                    {/* <TableCell align="right">{row.margin}</TableCell> */}
                    <TableCell align="right">
                      {
                        // invoiceData?.invoiceCompleteObj?.InvoiceLineItems[index]
                        //   ?.totalAmount
                        parseFloat(lineItem.totalAmount)?.toFixed(2)
                      }
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                  <TableCell rowSpan={3} colSpan={2} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow> */}
                </>
              );
            // })
          })}
          {/*       
          <TableRow>
          <TableCell colSpan={1}>
              Subtotal
            </TableCell>
          
          <TableCell  colSpan={4} align="right">
              {totalCost}
            </TableCell>
          </TableRow> */}
          <TableRow style={{ backgroundColor: "ButtonHighlight" }}>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right" colSpan={3}>
              <Typography
                style={{
                  display: "inline-block",
                  backgroundColor: "peachpuff",
                  border: "1px solid black",
                  padding: "6px",
                }}
              >
                ${parseFloat(totalCost)?.toFixed(2)}
              </Typography>
              <Typography style={{ display: "inline-block" }}>
                {/* Add Total calculation here */}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
