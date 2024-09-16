'use strict';
const connectedUsers = new Map();
module.exports = io => {
  /* Middleware
   * This middleware will run everytime when user reload page or login
  */
//   require("./middleware")(io, connectedUsers);
  io.on('connection',async socket => {
    //console.log(`User connected: ${socket.id}`);
    require("./privateChat")(io, socket);

  });
};


