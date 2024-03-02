const mongoose = require('mongoose');

const donationItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },

});

const DonationItem = mongoose.model('DonationItem', donationItemSchema);

module.exports = DonationItem;
