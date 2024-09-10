import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const getTokenFromLocalStorage = () => {
  let userInfo = localStorage.getItem("userInfo");
  try {
    console.log(userInfo);
    userInfo =
      userInfo !== "undefined" && userInfo ? JSON.parse(userInfo) : null;
  } catch (e) {
    console.error("Error parsing userInfo from localStorage", e);
    userInfo = null;
  }
  const pathnameArr = window.location.pathname.split("/");
  console.log(pathnameArr);
  const token = userInfo?.token;
  // Allow access to specific pages without requiring a token
  const allowedPaths = [
    "/",
    "/login",
    "/terms",
    "/privacypolicy",
    "/verifycode",
  ];
  const notAllowedPaths = ["/login", "/signup"];
  const currentPath = window.location.pathname;

  if (token) {
    console.log("Test", userInfo);
    if (notAllowedPaths.includes(currentPath)) {
      window.location.href = "/dashboard";
    }
    return token;
  } else {
    if (pathnameArr[1] === "invitation") {
      return;
    }
    // If the current path is allowed, don't redirect
    if (!allowedPaths.includes(currentPath)) {
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
