const { PrivateChatMessage } = require("../models");
const { Op } = require('sequelize');

module.exports = (io, socket) => {
  socket.on("privateMessage", async (data, callback) => {
    const { senderId, recipientId, message } = data;

    try {
      const privateChatMessage = await PrivateChatMessage.create({
        senderId,
        recipientId,
        message,
      });

      // Emit the new message to the sender
      io.to(senderId).emit("privateMessage", privateChatMessage);

      // Emit the new message to the recipient
      io.to(recipientId).emit("privateMessage", privateChatMessage);

      //console.log(privateChatMessage.dataValues)
      // You can also broadcast the message to other connected users if needed
      // io.emit('privateMessage', privateChatMessage);

      // Optionally, you can send an acknowledgment to the client
      if (callback) {
        callback({
          success: true,
          message: "Private message sent successfully",
        });
      }
    } catch (error) {
      console.error(error);
      // Send an error response to the client
      if (callback) {
        callback({ success: false, message: "Error sending private message" });
      }
    }
  });

  socket.on('privateMessageHistory', async (data, callback) => {
    const { userId } = data;
//console.log(userId)
    try {
      // Fetch the private message history for the user
      const history = await PrivateChatMessage.findAll({
        where: {
          [Op.or]: [
            { senderId: userId },
            { recipientId: userId },
          ],
        },
      });
      // Emit the private message history to the client
      io.to(socket.id).emit('privateMessageHistory', history);

      // Optionally, send an acknowledgment to the client
      if (callback) {
        callback({
          success: true,
          message: 'Private message history retrieved successfully',
        });
      }
    } catch (error) {
      console.error(error);
      // Send an error response to the client
      if (callback) {
        callback({
          success: false,
          message: 'Error retrieving private message history',
        });
      }
    }
  });


  socket.on('disconnect', () => {
    //console.log(`User disconnected: ${socket.id}`);
  });

};

// controllers/privateChatController.js

// exports.createPrivateMessage = async (req, res) => {
//   const { senderId, recipientId, message } = req.body;

//   try {
//     const privateChatMessage = await PrivateChatMessage.create({ senderId, recipientId, message });

//     // Emit the new message to the sender
//     io.getIo().to(senderId).emit('privateMessage', privateChatMessage);

//     // Emit the new message to the recipient
//     io.getIo().to(recipientId).emit('privateMessage', privateChatMessage);

//     res.status(201).json(privateChatMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
