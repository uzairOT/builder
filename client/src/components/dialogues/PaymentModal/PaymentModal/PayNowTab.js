import { FormControl, FormHelperText, FormLabel, Stack } from "@mui/material";
import React from "react";
import Input from "@mui/joy/Input";
import Images from "./Images";
import CVC from './assets/images/cvc.png'

const PayNowTab = () => {
  return (
    <Stack spacing={1}>
      <label id="cardNumber" style={themeStyle.inputLabels}>
        Card Number
      </label>
      <Input
        id="cardNumber"
        placeholder="1234 1234 1234 1234"
        endDecorator={
          <Stack direction={"row"}>
            <Images />
          </Stack>
        }
      ></Input>

      <Stack direction={"row"} spacing={5}>
        <FormControl>
          <FormLabel style={themeStyle.inputLabels}>Expiration</FormLabel>
          <Input id="expiration" placeholder="MM / YY" />
        </FormControl>
        <FormControl>
          <FormLabel style={themeStyle.inputLabels}>CVC</FormLabel>
          <Input id="cvc" placeholder="CVC" endDecorator={<img src={CVC} alt="CVC icon" style={{ width: '35px', height: '28px' }}></img>} />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default PayNowTab;

const themeStyle = {
  inputLabels: {
    fontSize: "14px",
    color: "gray",
  },
};
