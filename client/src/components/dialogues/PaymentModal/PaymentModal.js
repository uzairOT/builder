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
import LockIcon from "@mui/icons-material/Lock";
import PayNowTab from "./PayNowTab";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const initialValues = {
  address: "",
};
const PromoCodeButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  textTransform: "capitalize",
});

let data = localStorage.getItem("userInfo");
let userInfo = JSON.parse(data);
const currentUser = userInfo?.user;

const PaymentModal = ({ currentPlan, currentPakage }) => {
  const [values, setValues] = useState(initialValues);
  const [countries, setCountries] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [userAddress, setUserAddress] = useState("");

  const amount = currentPlan;
  useEffect(() => {
    console.log("==============1111111111 ", currentUser);
    fetch("http://3.135.107.71/payment/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://3.135.107.71/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    }).then(async (result) => {
      // console.log("-=-=-=-result ", result);
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [amount]);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectTab = (e, newValue) => {
    setSelectedTab(newValue);
  };

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
    getTabColor: (index) => ({
      color: "gray",
      "--Tab-indicatorColor": selectedTab === index ? "green" : "transparent",
      backgroundColor: "transparent",
    }),
  };

  return (
    <Paper style={{ borderRadius: "14px", overflowX: "hidden", width: "100%" }}>
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
            inputProps={{ maxLength: 50 }}
              id="organizationName"
              label=""
              variant="outlined"
              size="small"
              name="organizationName"
              value={currentUser.companyName} // Set the value to currentUser.companyName
              onChange={handleInputChange}
              disabled // Make the TextField disabled
            />
            {/* <label id="countryOrRegion" style={themeStyle.inputLabels}>
              Country or Region
            </label> */}
            {/* <TextField
                id="countryOrRegion"
                label=""
                variant="outlined"
                size="small"
                value={values.country}
              /> */}
            {/* <Autocomplete
              size="small"
              id="countryOrRegion"
              options={countries}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            ></Autocomplete> */}
            <label id="address" style={themeStyle.inputLabels}>
              Address Line 1
            </label>
            <OutlinedInput
            inputProps={{ maxLength: 50 }}
            // inputProps={{maxLength:1}}
              id="address"
              name="address"
              placeholder={"Street address"}
              variant="outlined"
              size="small"
              value={values.address}
              onChange={handleInputChange}
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
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            py={1}
          >
            <Typography
              fontFamily={"Inter, sans serif"}
              fontSize={"18px"}
              fontWeight={"500"}
            >
              2. Payment Method
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <LockIcon fontSize="12px" />
              <Typography fontSize={"12px"}>Secure form</Typography>
            </Stack>
          </Stack>
          <Stack
            pt={2}
            spacing={1}
            direction={"row"}
            alignItems={"center"}
            py={0.1}
          >
            <Typography>
              <b>Choosen Plan: </b>
              {currentPakage}
            </Typography>
            <Typography>{amount}$</Typography>
          </Stack>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                address={values.address}
                currentPlan={amount}
                currentPakage={currentPakage}
                orgName={currentUser.companyName}
                userId={currentUser.id}
              />
            </Elements>
          )}
          {/* <Stack py={1} pb={4}>
            <Tabs
              aria-label="Payment tabs"
              defaultValue={0}
              value={selectedTab}
              onChange={handleSelectTab}
              sx={{ backgroundColor: "transparent" }}
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
          <BuilderProButton
            variant={"contained"}
            backgroundColor={"#4C8AB1"}
            onClick={makePayment}
          >
            Purchase
          </BuilderProButton> */}
        </Stack>
      </form>
    </Paper>
  );
};

export default PaymentModal;
