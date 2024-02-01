const { Sequelize } = require('sequelize');
const sequelize = require('./database');
const Message = require('./models/messageModel'); // Adjust the path accordingly

// Define models
const models = {
  Message: Message, 

};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync();
    console.log('Models synced with the database.');
  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
  }
})();

module.exports = models;
