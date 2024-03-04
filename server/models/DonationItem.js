const mongoose = require('mongoose');

const donationItemSchema = new mongoose.Schema({
  itemType: { type: String, required: true },
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  donorAddress: { type: String, required: true },
});

const DonationItem = mongoose.model('DonationItem', donationItemSchema);

module.exports = DonationItem;
