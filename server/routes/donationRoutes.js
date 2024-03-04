const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Recommendation = require('../models/Recommendation');
const knnService = require('../services/knnService');

router.post('/donate', async (req, res) => {
  try {
    const newDonationItem = await Donation.create(req.body);
    res.status(201).json(newDonationItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/donate', async (req, res) => {
  try {
    const donationItems = await Donation.find();
    res.status(200).json(donationItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/recommendations/:donorItemId/:recipientItemId', async (req, res) => {
  try {
    const { donorItemId, recipientItemId } = req.params;
    const recommendations = await knnService.getRecommendations(donorItemId, recipientItemId);
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


