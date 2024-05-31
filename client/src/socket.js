import { io } from "socket.io-client";

let data = localStorage.getItem("userInfo");
let userInfo = JSON.parse(data);
const currentUser = userInfo?.user;

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://192.168.0.113:8080";

export const socket = io(URL, {
  query: { userId: currentUser?.id },
});
