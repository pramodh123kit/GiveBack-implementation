const mongoose = require('mongoose');

const recipientItemSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  recipientAddress: { type: String, required: true },
});

const RecipientItem = mongoose.model('RecipientItem', recipientItemSchema);

module.exports = RecipientItem;
