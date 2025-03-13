import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
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
import { useVerifyCouponMutation } from "../../../redux/apis/Coupon/CouponApiSlice";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
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

const PaymentModal = ({
  currentPlan,
  currentPakage,
  selectedPlan,
  setSelectedPlan,
  currentPayment
}) => {
  const [values, setValues] = useState(initialValues);
  const [countries, setCountries] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discounted, setDiscounted] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [percentageOff, setPercentageOff] = useState(0);
  const [paymentType, setPaymentType] = useState("Monthly");
  const [verifyCoupon, { isLoading }] = useVerifyCouponMutation();
  const [amount, setAmount] = useState();
  const { t } = useTranslation()
  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };
  // console.log(currentPlan);
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };
  const handlePromoCode = async () => {
    try {
      if (!amount) {
        toast.warning("Select a plan");
        return;
      }
      const res = await verifyCoupon({
        couponCode: promoCode,
        amount: amount,
      })
        .unwrap()
        .then((res) => {
          // console.log(res);
          setNewAmount(res.newAmount);
          setDiscounted(res.discount);
          setPercentageOff(res.discountPercentage);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // console.log("==============1111111111 ", currentUser);
    fetch("https://builderbuilder.net/payment/config", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }),
    })
      .then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setClientSecret('');
    fetch("https://builderbuilder.net/payment/create-payment-intent", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }),
      body: JSON.stringify({ amount }),
    })
      .then(async (result) => {
        var { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    if (currentPakage === "Business Pro") {
      setAmount(
        paymentType === "Yearly" ? 2799 : paymentType === "Monthly" ? 319 : ""
      );
    } else if (currentPakage === "Business +") {
      setAmount(
        paymentType === "Yearly" ? 399 : paymentType === "Monthly" ? 39.99 : ""
      );
    }
  }, [currentPakage, paymentType]);


  useEffect(() => {
    if (discounted === "") {
    } else {
      setDiscounted("");
    }
  }, [currentPakage]);

  const themeStyle = {
    promoCode: {
      padding: "8px",
      width: "100%",
    },
    inputLabels: {
      fontFamily: "var(--main-font-family)",
      fontSize: { sm: "16px", xs: "12px" },
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
            fontFamily={"var(--main-font-family)"}
            fontSize={{ sm: "18px", xs: "14px" }}
            fontWeight={"500"}
          >
            {t("Subscription.form.orgInfo")}
          </Typography>
          <Stack pt={2} spacing={1}>
            <InputLabel id="organizationName" sx={themeStyle.inputLabels}>
              {t("Subscription.form.orgName")}
            </InputLabel>
            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { sm: "15px", xs: '12px' }
                },
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "var(--main-font-family)",
                  fontSize: { sm: "14px", xs: '12px' }
                },
              }}

              inputProps={{ maxLength: 50 }}
              id="organizationName"
              label=""
              variant="outlined"
              size="small"
              name="organizationName"
              value={currentUser?.companyName} // Set the value to currentUser.companyName
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
            <InputLabel id="address" sx={themeStyle.inputLabels}>
              {t("Subscription.form.address")}
            </InputLabel>
            <OutlinedInput
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { sm: "15px", xs: '12px' }
                },
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "var(--main-font-family)",
                },
              }}
              inputProps={{ maxLength: 50 }}
              // inputProps={{maxLength:1}}
              id="address"
              name="address"
              placeholder={t("Subscription.form.placeholder")}
              variant="outlined"
              size="small"
              value={values.address}
              onChange={handleInputChange}
            />
          </Stack>
          <Stack p={1} py={4} spacing={1}>
            <Stack flex={1} direction={"row"} spacing={1}>
              <Typography fontFamily={"var(--main-font-family)"} fontSize={{ sm: "16px", xs: "14px" }} color={"gray"}>
                {t("Subscription.form.promo")}
              </Typography>
              <HelpIcon
                fontSize={"small"}
                sx={{ color: "GrayText", "&:hover": { color: "black" } }}
              />
            </Stack>
            <Stack flex={1} direction={{sm:"row", xs:"column"}} spacing={1}>
              <OutlinedInput
                variant={"outlined"}
                placeholder={t("Subscription.form.placeholder1")}
                size="small"
                sx={{
                  width: {sm:"67%", xs:"100%"},
                  backgroundColor: "#F5F5F5", 
                  "& .MuiInputBase-input": { fontSize: { sm: "14px", xs: "12px" } },
                  "& .MuiInputBase-input::placeholder": {
                    fontFamily: "var(--main-font-family)",
                    fontSize: { sm: "14px", xs: "11px" }
                  },
                }}
                value={promoCode}
                onChange={(e) => handlePromoCodeChange(e)}
              ></OutlinedInput>
              <PromoCodeButton
                width={"30%"}
                variant="contained"
                disabled={isLoading}
                onClick={handlePromoCode}
              >
                {isLoading ? (
                  <CircularProgress sx={{ fontSize: "14px" }} />
                ) : (
                  <Typography
                    sx={{
                      fontFamily: "var(--main-font-family)",
                    }}
                    fontSize={{ xl: 14, lg: 11, xs:11  }}
                  >
                    {t("Subscription.form.button")}{" "}
                  </Typography>
                )}
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
              fontFamily={"var(--main-font-family)"}
              fontSize={{sm:"18px", xs:"14px"}}
              fontWeight={"500"}
            >
              {t("Subscription.form.paymentMethod")}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <LockIcon fontSize="12px" />
              <Typography fontSize={{sm:"12px", xs:"11px"}}>Secure form</Typography>
            </Stack>
          </Stack>
          <Stack
            pt={2}
            spacing={1}
            direction={"row"}
            alignItems={"center"}
            py={0.1}
            sx={{ gap: 2 }}
          >
            <Typography fontFamily={"var(--main-font-family)"} sx={{ fontSize: { sm: "16px", xs: "13px" } }}>
              <b
                style={{
                  fontFamily: "var(--main-font-family)",
                }}
              >
                {t("Subscription.form.choosePlan")}:{" "}
              </b>
              {currentPakage}
            </Typography>
            <Typography>{amount ? `$${amount}` : ''}</Typography>

            {/* <Typography fontSize={'14px'} color={'tomato'}>{discounted ? ` -${((discounted/amount) *100)}% off` : ''}</Typography> */}

            <FormControl>
              <RadioGroup
                row
                aria-labelledby="payment-type-group-label"
                name="payment-type-group"
                value={paymentType}
                onChange={handlePaymentTypeChange}
              >
                <FormControlLabel
                  value="Monthly"
                  control={<Radio size="small" />}
                  label={t("Subscription.form.monthly")}
                  slotProps={{
                    typography: {
                      sx: {
                        fontSize: { sm: "16px", xs: "13px" }
                      }
                    }
                  }}
                />
                <FormControlLabel
                  value="Yearly"
                  control={<Radio size="small" />}
                  label={t("Subscription.form.yearly")}
                  slotProps={{
                    typography: {
                      sx: {
                        fontSize: { sm: "16px", xs: "13px" }
                      }
                    }
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {discounted && (
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} gap={1}>
                <Typography>
                  <b>{t("Subscription.form.discount")}: </b>
                </Typography>
                <Typography>{discounted ? `${newAmount}$    ` : ""}</Typography>
              </Stack>
              <Typography fontSize={"14px"} color={"tomato"}>
                {discounted ? ` -${percentageOff}%` : ""}
              </Typography>
            </Stack>
          )}
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                selectedPlan={selectedPlan}
                address={values.address}
                paymentAmount={discounted ? newAmount : amount}
                currentPakage={currentPakage}
                orgName={currentUser.companyName}
                orgId={currentUser?.organization?.organizationId}
                userId={currentUser.id}
                paymentType={paymentType}
                currentPlan={currentPlan}
                currentPayment={currentPayment}
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
