const Recipient = require('../models/Recipient');
const Donation = require('../models/Donation');

const calculateEuclideanDistance = (recipient, donation) => {

  if (!recipient.itemType || !recipient.itemName || !recipient.itemDescription || !recipient.recipientAddress) {
    throw new Error('Recipient item is missing required properties');
  }

  if (!donation.itemType || !donation.itemName || !donation.itemDescription || !donation.donorAddress) {
    throw new Error('Donation item is missing required properties');
  }

  // Calculating Euclidean distance between recipient and donor items
  return Math.sqrt(
    Math.pow(recipient.itemType === donation.itemType ? 0 : 1, 2) +
    Math.pow(recipient.itemName === donation.itemName ? 0 : 1, 2) +
    Math.pow(recipient.itemDescription === donation.itemDescription ? 0 : 1, 2) +
    Math.pow(recipient.recipientAddress === donation.donorAddress ? 0 : 1, 2)
  );
};

const getClosestMatch = async (recipient) => {
  try {
    // Finding all donor items
    const donorItems = await Donation.find();

    // Checking if donor items are found
    if (donorItems.length === 0) {
      throw new Error('No donor items found');
    }

    // Calculating Euclidean distance for each donor item
    const distances = donorItems.map((donation) => ({
      donorItemId: donation._id,
      distance: calculateEuclideanDistance(recipient, donation),
    }));

    // Sorting distances to find the closest match
    distances.sort((a, b) => a.distance - b.distance);

    // Getting the ID of the closest match
    const closestMatchId = distances[0].donorItemId;

    // Finding the closest match item
    const closestMatch = await Donation.findById(closestMatchId);

    // Returning closest match
    return closestMatch;
  } catch (error) {
    console.error('Error finding closest match:', error);
    throw error;
  }
};

module.exports = { getClosestMatch };