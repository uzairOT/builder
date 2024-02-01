const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const express = require("express");

const { sequelize } = require("./models");
const app = express();
const http = require("http");
const cors = require("cors");
const appRoutes = require("./routes")

const init =require("./socket/index.js");

app.use(cors());
require("dotenv").config();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
app.use("/", appRoutes);

const io = require('socket.io')(server, {
  cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
      allowEIO3: true,
  },
  transport: ['websocket'],
});
init(io);

app.use(notFound);
app.use(errorHandler);




// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);




//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    // return sequelize.sync();

  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

server.listen(8080, () => {
  console.log("SERVER IS RUNNING");
});






// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

// app.get("/", (req, res, next) => {
//   res.status(200).send("Hello world! We are running under HTTPS!");
// });

// app.post("/todos", async (req, res) => {
//   const userCredentials = req.body;
//   console.log(userCredentials.email);
//   try {
//     const todos = await pool.query(
//       "SELECT * FROM todos WHERE user_email = $1",
//       [userCredentials.email]
//     );
//     console.log(todos.rows);
//     res.json(todos.rows);
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.use("/auth", authRouter);

// const port = process.env.PORT || 8080;

// server.listen(port, () => {
//   console.log(`Server is listening on http://localhost:${port}`);
// });

