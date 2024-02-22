// controllers/privateChatController.js
const { PrivateChatMessage } = require('../models');
const io = require('../socket'); 

exports.createPrivateMessage = async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  try {
    const privateChatMessage = await PrivateChatMessage.create({ senderId, recipientId, message });

    // Emit the new message to the sender
    io.getIo().to(senderId).emit('privateMessage', privateChatMessage);

    // Emit the new message to the recipient
    io.getIo().to(recipientId).emit('privateMessage', privateChatMessage);

    res.status(201).json(privateChatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
