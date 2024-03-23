const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    feedbackText: {
      type: String,
      required: true
    },
    recipientId: {
      type: String, 
      required: true,
      validate: {
        validator: function(v) {
          return true; 
        },
        message: 'Custom validation failed'
      }
    }
  });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
