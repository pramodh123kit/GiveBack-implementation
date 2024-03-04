const express = require('express');
const router = express.Router();
const Recipient = require('../models/Recipient');
const knnService = require('../services/knnService');

router.post('/recipientSubmitForm', async (req, res) => {
  try {
    const newRecipientItem = await Recipient.create({
      itemType: req.body.itemType,
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      itemQuantity: req.body.itemQuantity,
      recipientAddress: req.body.recipientAddress,
      recipientContactNumber: req.body.recipientContactNumber,
    });

    const { closestMatch, donorInfo } = await knnService.getClosestMatch(newRecipientItem);

    res.status(201).json({ newRecipientItem, closestMatch, donorInfo });
  } catch (error) {
    console.error('Error submitting recipient form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getClosestMatch', async (req, res) => {
  try {
    const recipientItem = req.body;
    const closestMatch = await knnService.getClosestMatch(recipientItem);

    res.status(200).json(closestMatch);
  } catch (error) {
    console.error('Error getting closest match:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
