// routes.js
const express = require('express');
const router = express.Router();
const groupChatRoutes = require('./routes/groupChatRoutes');
const privateChatRoutes = require('./routes/privateChatRoutes');
const userRoutes = require("./routes/userRoutes")

// Use other routers
router.use('/private', privateChatRoutes);

router.use('/group', groupChatRoutes);

router.use('/user', userRoutes);

// Add your default route or any other routes as needed
router.get('/', function (req, res) {
  res.send('Hello, this is the main route!');
});

module.exports = router;
