import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import {
  useGetProjectInvoicesQuery,
} from "../../../redux/apis/Project/projectApiSlice";
import { useParams } from "react-router-dom";
import InvoicesTable from "./InvoicesTable";
import CloseIcon from "@mui/icons-material/Close";
import { currencyFormatter, headerFormatter } from "../../../utils/Formatters/excelFormatters";
import XLSX from "xlsx-js-style";
import { Excel } from "../../../assets/FileSvg/excel";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const ADD_INVOICE_URL = "https://builderbuilder.net/payment/addInvoiceToQuickBooks";
const ProjectsInvoices = ({ userRole, isModal, handleClose }) => {
  const { t } = useTranslation();
  const params = useParams();
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const { data, refetch } = useGetProjectInvoicesQuery({
    projectId: currentProjectId,
    userId: user.user.id,
  });
  // console.log(data);
  const [checkedRow, setCheckedRow] = useState(null);
  // const [getWorkOrder, {isLoading}] = useGetWorkOrderDetailsMutation()
  const [phaseItems, setPhaseItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  

  const handleExportInvoices = () => {
    const invoiceRows = [];
  
    const processInvoices = (invoices, status) => {
      invoices.forEach((invoice) => {
        invoice.InvoiceLineItems.forEach((lineItem) => {
          invoiceRows.push({
            InvoiceNumber: invoice.InvoiceNumber,
            InvoiceDate: new Date(invoice.InvoiceDate).toLocaleDateString(),
            InvoiceDueDate: new Date(invoice.InvoiceDueDate).toLocaleDateString(),
            InvoiceStatus: status,
            InvoiceBill: Number(invoice.InvoiceBill),
            ClientName: invoice.Client?.firstName || "N/A",
            ClientEmail: invoice.Client?.email || "N/A",
            CompanyName: invoice.Client?.companyName || "N/A",
            LineItemTitle: lineItem.LineItem?.title || "N/A",
            LineItemQuantity: lineItem.LineItem?.quantity || "N/A",
            LineItemUnitPrice: Number(lineItem.LineItem?.unit_price) || 0,
            LineItemTotalAmount: Number(lineItem.totalAmount) || 0,
          });
        });
      });
    };
  
    processInvoices(data.paidInvoices, "Paid");
    processInvoices(data.unpaidInvoices, "Unpaid");
    processInvoices(data.overdueInvoices, "Overdue");

    const worksheet = XLSX.utils.json_to_sheet(invoiceRows);

    const currencyColumns = ["InvoiceBill", "LineItemUnitPrice", "LineItemTotalAmount"];
    currencyFormatter(currencyColumns, invoiceRows, worksheet);
    headerFormatter(worksheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
    XLSX.writeFile(workbook, `Invoices-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleConnectToQuickbooks  = async () => {
    try {
      setIsLoading(true);
        const response = await axios.post(ADD_INVOICE_URL, {
          projectId: currentProjectId,
          userId: user.user.id,
          organizationId: user.user.organization.organizationId
        }, {
          headers: {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
            'Content-Type': 'application/json',
          },
        });
        toast.success(response?.data?.message)
        setIsLoading(false);
    } catch (error) {
      console.error('Error fetching authUri:', error);
      toast.error(error?.response?.data?.message)
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack width="80x%">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            p={3}
            pb={2}
            color={"#4C8AB1"}
            fontFamily={"var(--main-font-family)"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            {t("ProjectInvoices.title3")}
          </Typography>
          {isModal && (
            <Stack alignItems={"flex-end"}>
              <IconButton onClick={handleClose}>
                <CloseIcon></CloseIcon>
              </IconButton>
            </Stack>
          )}
        </Stack>
        <Tabs
          defaultValue={0}
          sx={{ backgroundColor: "transparent", overflowX: "auto" }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <TabList
              sx={{
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "0",
                  bgcolor: "white",
                  "--Tab-indicatorColor": "#4C8AB1",
                  "--Tab-indicatorRadius": "28px",
                  "--Tab-indicatorThickness": "3.5px",
                  "--Tab-indicatorSize": "70%",
                  fontWeight: "500",
                },
                boxShadow: "none",
              }}
            >
              <Tab
                sx={{
                  fontFamily: "var(--main-font-family)",
                  fontSize: "15px",
                }}
              >
                {t("ProjectInvoices.paid")}
              </Tab>
              <Tab
                sx={{
                  fontFamily: "var(--main-font-family)",
                  fontSize: "15px",
                }}
              >
                {t("ProjectInvoices.unpaid")}
              </Tab>

              <Tab
                sx={{
                  fontFamily: "var(--main-font-family)",
                  fontSize: "15px",
                }}
              >
                {t("ProjectInvoices.overdue")}
              </Tab>
            </TabList>
            <Stack direction={"row"} style={{ paddingRight: "16px" }} justifyContent={'center'} alignItems={'center'} gap={2}>
            <Tooltip title={t("ProjectInvoices.export")} placement="top">
                <Box sx={{ cursor: "pointer" }} onClick={handleExportInvoices}>
                  <Excel
                    fill={"#4C8AB1"}
                    width={"30px"}
                    height={"30px"}
                  />
                </Box>
              </Tooltip>
            <BuilderProButton
                    backgroundColor={"#FFAC00"}
                    variant={"contained"}
                    fontFamily={"var(--main-font-family)"}
                    fontSize={{ lg: "12px", xs: "10px" }}
                    fontWeight={"600"}
                    padding={{
                      sm: "6px 32px 6px 32px",
                      xs: "5px 20px 5px 20px",
                    }}
                    handleOnClick={handleConnectToQuickbooks}
                  >
                        {isLoading ? <CircularProgress size={20} /> : t("ProjectInvoices.addQuickbooks")}
                  </BuilderProButton>
            </Stack>
          </Stack>
          <TabPanel
            sx={{ padding: 0 }}
            value={0}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <InvoicesTable
              paidInvoices={true}
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.paidInvoices}
              //   workOrder={workOrder}
              setPhaseItems={setPhaseItems}
            />
          </TabPanel>
          <TabPanel
            sx={{ padding: 0 }}
            value={1}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <InvoicesTable
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.unpaidInvoices}
              //   workOrder={workOrder}
              refetch={refetch}
              setPhaseItems={setPhaseItems}
            />
          </TabPanel>
          <TabPanel
            sx={{ padding: 0 }}
            value={2}
            style={{ padding: "16px 8px 0 8px" }}
          >
            <InvoicesTable
              status="declined"
              setCheckedRow={setCheckedRow}
              checkedRow={checkedRow}
              data={data?.overdueInvoices}
              refetch={refetch}
              setPhaseItems={setPhaseItems}
            />
          </TabPanel>
        </Tabs>
      </Stack>
      <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
        {/* <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={'var(--main-font-family)'}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  handleOnClick={handleButton}
                >
                  Request New
                </BuilderProButton> */}
      </Stack>
    </>
  );
};

export default ProjectsInvoices;

const themeStyle = {
  borders: {
    borderRadius: "14px",
    padding: "8px",
  },
  border: {
    borderRadius: "14px",
  },
};
