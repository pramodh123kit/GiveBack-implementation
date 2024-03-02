const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  donorItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationItem', required: true },
  recipientItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'DonationItem', required: true },
  distance: { type: Number, required: true },
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
