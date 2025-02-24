import React, { useEffect, useLayoutEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useGetSubcontractorInvoicesMutation } from "../../redux/apis/Reports/reportsApiSlice";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import CustomTooltip from "../UI/Tooltip/CustomTooltip";
import { useTranslation } from 'react-i18next';
const SubcontractorBillingChart = () => {
  let dataUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(dataUser);
  const currentUser = userInfo?.user;
  const userId = currentUser?.id;
  const { id } = useParams();
  const projectId = id;
  const [invoiceData, setInvoiceData] = useState([]);
  const {t} = useTranslation()
  const [
    getSubcontractorInvoices,
    { data: subcontractorInvoices, isLoading: isLoadingSubcontractorInvoices },
  ] = useGetSubcontractorInvoicesMutation({ projectId });
  const today = moment().tz("UTC");
  // Aggregate invoice amounts per subcontractor
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // Listen for mouse movements to update tooltip position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setTooltipPosition({ top: e.clientY + 10, left: e.clientX + 10 });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const fetchProfitStats = async () => {
    try {
      const result = await getSubcontractorInvoices({
        projectId,
        userId
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
      events: {
        // Example: On data point mouse enter, show custom tooltip
        dataPointMouseEnter: function(event, chartContext, config) {
          const dataPointIndex = config.dataPointIndex;
          const subName = labels[dataPointIndex];
          const invoices = invoiceData[subName].invoices;
          // Build tooltip content as JSX
          const content = (
            <div>
              <strong style={{ fontSize: '14px', color: '#333' }}>{subName}</strong>
              <table style={{ width: '100%', fontSize: '12px', marginTop: '5px' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '3px' }}>{t("ProjectReports.SubcontractorBillingChart.amount")}</th>
                    <th style={{ textAlign: 'left', padding: '3px' }}>{t("ProjectReports.SubcontractorBillingChart.status")}</th>
                    <th style={{ textAlign: 'left', padding: '3px' }}>{t("ProjectReports.SubcontractorBillingChart.due")}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '3px' }}>${inv.amount}</td>
                      <td style={{
                        padding: '3px',
                        color: inv.status === "paid"
                          ? "#4CAF50"
                          : inv.status === "unpaid"
                          ? "#FFC107"
                          : "#F44336"
                      }}>
                        {inv.status.toUpperCase()}
                      </td>
                      <td style={{ padding: '3px' }}>{inv.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          setTooltipContent(content);
          setTooltipVisible(true);
        },
        dataPointMouseLeave: function(event, chartContext, config) {
          setTooltipVisible(false);
        }
      }
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
    tooltip: { enabled: false }, // Disable built-in tooltip
    title: { text: t("ProjectReports.SubcontractorBillingChart.title1"), align: "center" },
    noData: {
      text: t("ProjectReports.SubcontractorBillingChart.noData"),
      style: {
        fontSize: "16px",
        color: "#666",
      },
    }
  };


  return (
    <>
        <style>
        {`
          .apexcharts-tooltip {
            z-index: 9999 !important;
          }
        `}
      </style>
      <Card sx={{ p: 0, borderRadius: 3, boxShadow: 0, overflow: "visible" }}>
        <CardContent sx={{ p: 0 }}>
          <Typography
            fontSize={{ xl: "20px", lg: "16px", md: "20px", xs: "20px" }}
            fontFamily={"var(--main-font-family)"}
            fontWeight={"500"}
            color={"#4C8AB1"}
            variant="h6"
            p={1}
          >
            {t("ProjectReports.SubcontractorBillingChart.title1")}
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
      <CustomTooltip visible={tooltipVisible} position={tooltipPosition}>
        {tooltipContent}
      </CustomTooltip>
    </>
  );
};

export default SubcontractorBillingChart;
