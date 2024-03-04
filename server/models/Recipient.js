const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  itemType: String,
  itemName: String,
  itemDescription: String,
  itemQuantity: String,
  recipientAddress: String,
  recipientContactNumber: String,
});

const Recipient = mongoose.model('Recipient', recipientSchema);

module.exports = Recipient;
