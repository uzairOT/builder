// privateChatRoutes.js
const express = require('express');
const router = express.Router();
const privateChatController = require('../controller/privateChatController');

router.post('/create', privateChatController.createPrivateMessage);

module.exports = router;
