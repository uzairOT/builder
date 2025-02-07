import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useGetSubcontractorInvoicesMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";

const SubcontractorBillingChart = () => {
  const { id } = useParams();
  const projectId = id;
  const [invoiceData, setInvoiceData] = useState([]);
  const [
    getSubcontractorInvoices,
    { data: subcontractorInvoices, isLoading: isLoadingSubcontractorInvoices },
  ] = useGetSubcontractorInvoicesMutation({ projectId });
  const today = moment().tz("UTC");
  // Aggregate invoice amounts per subcontractor

  const fetchProfitStats = async () => {
    try {
      const result = await getSubcontractorInvoices({
        projectId,
      }).unwrap();
      const invoiceData = result.invoices.reduce((acc, invoice) => {
        const subName = `${invoice.Admin?.firstName} ${invoice.Admin?.lastName}` || "Unknown Subcontractor";
        const amount = Number(invoice.InvoiceBill);
        const dueDate = moment(invoice.InvoiceDueDate)
          .tz("UTC")
          .format("YYYY-MM-DD");
        const status = invoice.InvoiceStatus.toLowerCase();

        // Determine pastel bar colors
        let color;
        if (status === "paid") color = "#6ABF69"; // Deeper Pastel Green
        else if (status === "unpaid") color = "#FFB74D"; // Deeper Pastel Yellow
        else if (
          status === "overdue" ||
          moment(invoice.InvoiceDueDate).isBefore(today)
        )
          color = "#E57373"; // Deeper Pastel Red

        if (!acc[subName]) acc[subName] = { total: 0, invoices: [] };

        acc[subName].total += amount;
        acc[subName].invoices.push({ amount, dueDate, status, color });

        return acc;
      }, {});
      setInvoiceData(invoiceData);
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
    }
  };

  useEffect(() => {
    fetchProfitStats();
  }, []);

  // Extract labels and values
  const labels = Object.keys(invoiceData);
  const values = labels.map((sub) => invoiceData[sub].total);
  const colors = labels.map(
    (sub) => invoiceData[sub].invoices[0]?.color || "#D3D3D3"
  );

  // ApexCharts options
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    colors, // Pastel colors dynamically applied
    dataLabels: { enabled: false },
    xaxis: { categories: labels },
    yaxis: { title: { text: "Invoice Amount ($)" } },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const subName = labels[dataPointIndex];
        const invoices = invoiceData[subName].invoices;

        return `
            <div style="background: #fff; padding: 8px; border-radius: 5px; border: 1px solid #ddd; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); max-width: 220px; white-space: normal; word-wrap: break-word;">
              <strong style="font-size: 14px; color: #333;">${subName}</strong>
              <table style="width: 100%; font-size: 12px; margin-top: 5px;">
                <tr>
                  <th style="text-align: left; padding: 3px;">Amount</th>
                  <th style="text-align: left; padding: 3px;">Status</th>
                  <th style="text-align: left; padding: 3px;">Due</th>
                </tr>
                ${invoices
                  .map(
                    (inv) =>
                      `<tr>
                        <td style="padding: 3px;">$${inv.amount}</td>
                        <td style="padding: 3px; color: ${
                          inv.status === "paid"
                            ? "#4CAF50"
                            : inv.status === "unpaid"
                            ? "#FFC107"
                            : "#F44336"
                        };">${inv.status.toUpperCase()}</td>
                        <td style="padding: 3px;">${inv.dueDate}</td>
                      </tr>`
                  )
                  .join("")}
              </table>
            </div>`;
      },
    },
    title: { text: "Subcontractor Billing Overview", align: "center" },
    noData: {
      text: "No data available",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    }
  };

  return (
    <Card sx={{ p: 0, borderRadius: 3, boxShadow: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Typography
          fontSize={{ xl: "20px", lg: "16px", md: "20px", xs: "20px" }}
          fontFamily={"var(--main-font-family)"}
          fontWeight={"500"}
          color={"#4C8AB1"}
          variant="h6"
          p={1}
        >
          Subcontractor Billing Overview
        </Typography>
        <Divider variant="fullWidth" />
        <Chart
          options={chartOptions}
          series={[{ name: "Total Invoice", data: values }]}
          type="bar"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

export default SubcontractorBillingChart;
