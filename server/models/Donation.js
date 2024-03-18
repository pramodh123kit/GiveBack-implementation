const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  itemType: String,
  itemName: String,
  itemDescription: String,
  itemQuantity: String,
  donorAddress: String,
  contactNumber: String,
  email: String,
  donorName: String,
  donorId: String,
  image: { data: Buffer, contentType: String },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
