import {
  Autocomplete,
  Button,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import LockIcon from '@mui/icons-material/Lock';
import PayNowTab from "./PayNowTab";
import BuilderProButton from "../../UI/Button/BuilderProButton";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const initialValues = {
  organizationName: "",
  country: "",
  address: "",
  promoCode: "",
  paymentMethod: "",
  cardNumber: "",
  expirationMethod: "",
  cvc: "",
};
const PromoCodeButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  textTransform: "capitalize",
});

const PaymentModal = () => {
  const [values, setValues] = useState(initialValues);
  const [countries, setCountries] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectTab = (e, newValue)=> {
    setSelectedTab(newValue);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/flag/images"
        );
        const data = await res.json();
        setCountries(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const themeStyle = {
    promoCode: {
      padding: "8px",
      width: "100%",
    },
    inputLabels: {
      fontSize: "14px",
      color: "gray",
    },
    getTabColor: (index) =>({
     color: 'gray',
     "--Tab-indicatorColor" : selectedTab === index ? 'green' : 'transparent',
     backgroundColor:'transparent'
    })
  };
  

  return (
    <Paper style={{ borderRadius: "14px" }}>
      {/* Stack of the Form*/}
      <form>
        <Stack p={3} px={4}>
          <Typography
            fontFamily={"Inter, sans serif"}
            fontSize={"18px"}
            fontWeight={"500"}
          >
            1. Organization info
          </Typography>
          <Stack pt={2} spacing={1}>
            <label id="organizationName" style={themeStyle.inputLabels}>
              Organization Name
            </label>
            <TextField
              id="organizationName"
              label=""
              variant="outlined"
              size="small"
              name="organizationName"
              value={values.organizationName}
              onChange={handleInputChange}
            />
            <label id="countryOrRegion" style={themeStyle.inputLabels}>
              Country or Region
            </label>
            {/* <TextField
                id="countryOrRegion"
                label=""
                variant="outlined"
                size="small"
                value={values.country}
              /> */}
            <Autocomplete
              size="small"
              id="countryOrRegion"
              options={countries}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            ></Autocomplete>
            <label id="address" style={themeStyle.inputLabels}>
              Address Line 1
            </label>
            <OutlinedInput
              id="address"
              placeholder={"Street address"}
              variant="outlined"
              size="small"
              value={values.address}
            />
          </Stack>
          <Stack p={1} py={4} spacing={1}>
            <Stack flex={1} direction={"row"} spacing={1}>
              <Typography color={"gray"}>Have a promo code?</Typography>
              <HelpIcon
                fontSize={"small"}
                sx={{ color: "GrayText", "&:hover": { color: "black" } }}
              />
            </Stack>
            <Stack flex={1} direction={"row"} spacing={1}>
              <OutlinedInput
                variant={"outlined"}
                placeholder="Enter promo code"
                size="small"
                style={{ width: "67%", backgroundColor: "#F5F5F5" }}
              ></OutlinedInput>
              <PromoCodeButton width={"30%"} variant="contained">
                Apply Code
              </PromoCodeButton>
            </Stack>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} py={1}>
          <Typography
            fontFamily={"Inter, sans serif"}
            fontSize={"18px"}
            fontWeight={"500"}
          >
            2. Payment Method
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
          <LockIcon fontSize="12px" /> 
          <Typography fontSize={'12px'}>Secure form</Typography>
          </Stack>
          </Stack>
          <Stack py={1} pb={4}>
            <Tabs 
            aria-label="Payment tabs" 
            defaultValue={0} 
            value={selectedTab}
            onChange={handleSelectTab}
            sx={{backgroundColor: 'transparent'}}
            >
              <TabList>
                <Tab style={themeStyle.getTabColor(0)}>Pay now</Tab>
                <Tab style={themeStyle.getTabColor(1)}>Pay by Invoice</Tab>
              </TabList>
              <TabPanel value={0}>
                <PayNowTab />
              </TabPanel>
              <TabPanel value={1}>
                <b>Second</b> tab panel
              </TabPanel>
            </Tabs>
          </Stack>
          <BuilderProButton variant={'contained'} backgroundColor={'#4C8AB1'}>
                Purchase
          </BuilderProButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default PaymentModal;

