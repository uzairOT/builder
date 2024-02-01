// controllers/groupChatController.js
const { GroupChatMessage } = require('../models');
const io = require('../socket'); 

exports.createGroupMessage = async (req, res) => {
  const { groupId, senderId, message } = req.body;

  try {
    const groupChatMessage = await GroupChatMessage.create({ groupId, senderId, message });

    // Emit the new message to all clients in the group
    io.getIo().to(groupId).emit('groupMessage', groupChatMessage);

    res.status(201).json(groupChatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
