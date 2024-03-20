// groupChatRoutes.js
const express = require('express');
const router = express.Router();
const groupChatController = require('../controller/groupChatController');

router.post('/create', groupChatController.createGroupMessage);

module.exports = router;
