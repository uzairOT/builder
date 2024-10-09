// import { io } from "socket.io-client";

// let data = localStorage.getItem("userInfo");
// let userInfo = JSON.parse(data);
// const currentUser = userInfo?.user;

// // "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? "https://builderbuilder.net" : "https://builderbuilder.net";

// export const socket = io(URL, {
//   query: { userId: currentUser?.id },
// });


// Handling when user is not defined
  import { io } from "socket.io-client";

let data = localStorage.getItem("userInfo");
let userInfo = JSON.parse(data);
const currentUser = userInfo?.user;

// Define the socket variable
let socket = null;

// Only run the socket connection if the currentUser is defined
if (currentUser && currentUser.id) {
  // "undefined" means the URL will be computed from the `window.location` object
  const URL =
    process.env.NODE_ENV === "production" ? "https://builderbuilder.net" : "https://builderbuilder.net";

  // Establish the socket connection with userId query
  socket = io(URL, {
    query: { userId: currentUser.id },
  });
  console.log("socket initialized");
} else {
  console.log("No user found, socket connection not initiated.");
}

// Export the socket instance (which might be null if the user is not logged in)
export { socket };

