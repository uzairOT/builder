import { Box, CircularProgress, Container, Modal, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton';
import generatePDF,  { Resolution, Margin } from "react-to-pdf";
import GenerateInvoiceTable from './GenerateInvoiceTable';
import BuilderProNavbarLogo from "../../Navbar/assets/svgs/builder-pro-logo-navbar.svg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const options = {
  // default is `save`
  method: 'save',
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
     // margin is in MM, default is Margin.NONE = 0
     margin: Margin.LARGE,
     // default is 'A4'
     format: 'A4',
     // default is 'portrait'
     orientation: 'portrait',
  },
  canvas: {
     // default is 'image/jpeg' for better size performance
     mimeType: 'image/png',
     qualityRatio: 1
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break, 
  // so use with caution.
  overrides: {
     // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
     pdf: {
        compress: true
     },
     // see https://html2canvas.hertzen.com/configuration for more options
     canvas: {
        useCORS: true
     }
  },
};


const GenerateInvoice = ({open, handleClose,invoiceData}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const isInvoiceData = Boolean(invoiceData)
  const targetRef = useRef();
  const handleInvoicePrint = () => {
    setLoading(true); // Start loading

    try {
      generatePDF(targetRef, {
        ...options,
        filename: `Invoice-${invoiceData?.invoiceCompleteObj?.InvoiceNumber || 'Unknown'}.pdf`,
      }).then(() => {
        setLoading(false); // Stop loading
        toast.success('Invoice generated successfully!', { position: toast.POSITION.TOP_RIGHT });
      }).catch((error) => {
        setLoading(false); // Stop loading
        toast.error('Error generating invoice PDF', { position: toast.POSITION.TOP_RIGHT });
        console.error("Error generating invoice PDF:", error);
      });
    } catch (error) {
      setLoading(false); // Stop loading in case of synchronous error
      toast.error('Error generating invoice PDF', { position: toast.POSITION.TOP_RIGHT });
      console.error("Error generating invoice PDF:", error);
    }
  };


  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  // console.log(invoiceData)
  return (
    <>
       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ ...scrollable, height: "90%", width: { xs: "100%" } }}
        >
          <Box sx={style}>
            <Stack
              direction={{
                xl: "row",
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              }}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={2}
            >
              <Typography
                fontSize={"24px"}
                fontFamily={'var(--main-font-family)'}
                fontWeight={"600"}
                color={"#4C8AB1"}
              >
                {t("InvoiceModal.title1")}
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
               
              >
                <BuilderProButton
                  variant={"contained"}
                  backgroundColor={"#4C8AB1"}
                  fontSize={"16px"}
                  fontFamily={'var(--main-font-family)'}
                  handleOnClick={() => {
                    // console.log("Click Chala");
                    handleInvoicePrint();
                  }}
                  disabled={!isInvoiceData || loading}
                >
                  {loading ? <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={2}>{t("InvoiceModal.GenerateInvoice.generating")} <CircularProgress size={'16px'} sx={{color:'white'}}/></Stack>: t("InvoiceModal.GenerateInvoice.downloadInvoice")}
                </BuilderProButton>
              </Stack>
            </Stack>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media print": {
                  height: "auto",
                },
                marginTop: "2rem",
              }}
              ref={targetRef}
            >
              <Box sx={{ width: "100%", maxWidth: "800px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:'12px'
                  }}
                >
                  <img src={BuilderProNavbarLogo} alt={"BuilderBuilder Logo"} style={{width:'150px'}} />
                </Box>
                {/* <Stack direction={"flex"} justifyContent={"center"}>
                  <Typography
                    sx={{
                      color: "#ffb41a",
                      fontSize: "20px",
                      marginLeft: "5px",
                    }}
                  >
                    Builder
                  </Typography>
                  <Typography
                    sx={{
                      color: "#448cb8",
                      fontSize: "20px",
                      fontWeight: 1000,
                    }}
                  >
                    BUILDER
                  </Typography>
                </Stack> */}
                <Stack
                  direction={{
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "column",
                  }}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  p={1}
                  pl={2}
                  pr={2}
                  mt={3}
                  pb={1.5}
                >
                  <Stack spacing={1}>
                    <Typography sx={modalStyle}>
                      {t("InvoiceModal.GenerateInvoice.form.title1")}:{" "}
                      {invoiceData?.invoiceCompleteObj?.Admin?.companyName}
                    </Typography>
                    <Typography sx={modalStyle}>
                      {t("InvoiceModal.GenerateInvoice.form.title2")}: {invoiceData?.invoiceCompleteObj?.Client ? invoiceData?.invoiceCompleteObj?.Client?.firstName : invoiceData?.invoiceCompleteObj?.email}
                    </Typography>
                    <Typography sx={modalStyle}>
                      {t("InvoiceModal.GenerateInvoice.form.title3")}: {invoiceData?.invoiceCompleteObj?.Admin?.firstName}
                    </Typography>
                    {/* <Typography sx={modalStyle}>Company Address</Typography>
                <Typography sx={modalStyle}>City,State Zip</Typography>
                <Typography sx={modalStyle}>USA</Typography> */}
                  </Stack>
                  <Stack direction={"row"} spacing={4}>
                    <Stack spacing={1}>
                      <Typography sx={modalStyle} fontWeight={"bold"}>
                        {t("InvoiceModal.GenerateInvoice.form.Invoice#")}
                      </Typography>
                      <Typography sx={modalStyle} fontWeight={"bold"}>
                        {t("InvoiceModal.GenerateInvoice.form.invoiceDate")}
                      </Typography>
                      <Typography sx={modalStyle} fontWeight={"bold"}>
                        {t("InvoiceModal.GenerateInvoice.form.dueDate")}
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography sx={modalStyle}>
                        {invoiceData?.invoiceCompleteObj?.InvoiceNumber}
                      </Typography>
                      <Stack direction={"row"} spacing={0.5}>
                        <CalendarTodayIcon
                          fontSize="small"
                          style={{ color: "lightgray" }}
                        />
                        <Typography sx={modalStyle}>
                          {" "}
                          {invoiceData?.invoiceCompleteObj?.InvoiceDate
                            ? formatDate(
                                invoiceData.invoiceCompleteObj.InvoiceDate
                              )
                            : "N/A"}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} spacing={0.5}>
                        <CalendarTodayIcon
                          fontSize="small"
                          style={{ color: "lightgray" }}
                        />
                        <Typography sx={modalStyle}>
                          {" "}
                          {invoiceData?.invoiceCompleteObj?.InvoiceDate
                            ? formatDate(
                                invoiceData.invoiceCompleteObj.InvoiceDueDate
                              )
                            : "N/A"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={{
                    xl: "100%",
                    lg: "100%",
                    md: "100%",
                    sm: "100%",
                    xs: "100%",
                  }}
                >
                  <GenerateInvoiceTable      
                    invoiceData={invoiceData}
                  />
                </Stack>
                <Stack
                  direction={{ xl: "row", lg: "row", md: "column" }}
                  justifyContent={"space-between"}
                  pt={4}
                  pb={4}
                  pl={0}
                  pr={0}
                  spacing={8}
                >
                  <Stack>
                    <Typography sx={modalStyle} fontWeight={"bold"}>
                      {t("InvoiceModal.GenerateInvoice.form.Notes")}
                    </Typography>
                    <Typography sx={modalStyle}>
                      {t("InvoiceModal.GenerateInvoice.form.footer.footer1")}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography sx={modalStyle} fontWeight={"bold"}>
                      {t("InvoiceModal.GenerateInvoice.form.footer.footer2")}
                    </Typography>
                    <Typography sx={modalStyle}>
                      {t("InvoiceModal.GenerateInvoice.form.footer.footer3")}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Container>

            {/* <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              p={2}
            >
              <Button
                variant={"contained"}
                sx={{
                  backgroundColor: "#4C8AB1",
                  borderRadius: "28px",
                  fontFamily: 'var(--main-font-family)',
                  textTransform: "capitalize",
                  fontSize: "16px",
                }}
                fontSize={"16px"}
                fontFamily={'var(--main-font-family)'}
                onClick={() => {
                  handleClose();
                  handleGenerateInvoice();
                }}
              >
                Send Invoice
              </Button>
            </Stack> */}
          </Box>
        </Modal>
    </>
  )
}

const scrollable = {
    overflow: "scroll",
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
  };
  const style = {
    marginTop:{md:2, lg:2, sm:10,xs:10},
    overflow:"auto",
    width:{lg:"70",xs:"70%" ,md:"auto",},
    height:{md:"80%", xs:"100%",},
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "14px",
  };
  
  const modalStyle = {
    color: "gray",
    fontSize: "15px",
  };
export default GenerateInvoice
