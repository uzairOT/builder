import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const getTokenFromLocalStorage = () => {
  let userInfo = localStorage.getItem("userInfo");
  let invoiceCheck = localStorage.getItem("invoice");

  try {
    // console.log(userInfo);
    userInfo =
      userInfo !== "undefined" && userInfo ? JSON.parse(userInfo) : null;
  } catch (e) {
    console.error("Error parsing userInfo from localStorage", e);
    userInfo = null;
  }
  const pathnameArr = window.location.pathname.split("/");
  // Parse the token from the query string
const queryParams = new URLSearchParams(window.location.search);
const qToken = queryParams.get("token");
  // console.log(pathnameArr);
  const token = userInfo?.token;
  // Allow access to specific pages without requiring a token
  const allowedPaths = [
    "/",
    "/login",
    "/terms",
    "/privacypolicy",
    "/help",
    "/verifycode",  
  ];
  const allowedBasePaths = [
    "invitation"
  ]
  const notAllowedPaths = ["/login", "/signup"];
  const currentPath = window.location.pathname;
  const basePath = pathnameArr[1]

  if (token) {
    console.log(basePath)
    if (userInfo?.user?.hasValidSubscription === false && !["/subscription", "/"].includes(currentPath)) {
      window.location.href = "/subscription";
    } else {
      if(invoiceCheck){ return token }
      if (notAllowedPaths.includes(currentPath)) { window.location.href = "/dashboard"; }
    }
    return token;
  } else {

    console.log(basePath)
     if (basePath === 'invoicePayment' || basePath === 'connect-quickbooks') {
      if(qToken){ return qToken; }

      const prepareInvoiceObj = JSON.stringify({currentPath: currentPath, alertShown: false});
      localStorage.setItem('invoice', prepareInvoiceObj)
      window.location.href = "/login";
    } else if  (!allowedPaths.includes(currentPath) && !allowedBasePaths.includes(basePath)) {
      window.location.href = "/";
    } 
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  headers: { authorization: `Bearer ${getTokenFromLocalStorage()}` },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Project"],
  endpoints: (builder) => ({}),
});
