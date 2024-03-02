const DonationItem = require('../models/DonationItem');

const calculateEuclideanDistance = (features1, features2) => {
  return Math.sqrt(features1.reduce((acc, val, index) => acc + Math.pow(val - features2[index], 2), 0));
};

const getKNearestNeighbors = async (itemId, k) => {
  const targetItem = await DonationItem.findById(itemId);
  const allItems = await DonationItem.find();

  const neighbors = allItems
    .filter(item => item.id !== itemId)
    .map(item => ({
      item,
      distance: calculateEuclideanDistance(targetItem.features, item.features),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);

  return neighbors;
};

const getRecommendations = async (donorItemId, recipientItemId) => {
  const donorNeighbors = await getKNearestNeighbors(donorItemId, 5);
  const recipientNeighbors = await getKNearestNeighbors(recipientItemId, 5);

  const commonItems = donorNeighbors.filter(donorNeighbor =>
    recipientNeighbors.some(recipientNeighbor =>
      donorNeighbor.item.id === recipientNeighbor.item.id
    )
  );

  const recommendations = commonItems.map(commonItem => ({
    donorItemId: donorItemId,
    recipientItemId: recipientItemId,
    distance: commonItem.distance,
  }));

  return recommendations;
};

module.exports = { getRecommendations };
