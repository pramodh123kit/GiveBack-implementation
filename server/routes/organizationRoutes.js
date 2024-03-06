const express = require('express');
const router = express.Router();
const Organization = require('../models/Organizations');

router.post('/registerOrganization', async (req, res) => {
    try {
      const newOrganizationItem = await Organization.create({
        orgName: req.body.orgName,
        address: req.body.address,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        registrationDoc: req.body.registrationDoc,
        permit: req.body.permit,
        type: req.body.type,
        quantity: req.body.quantity,
        forWho: req.body.forWho,
        summary: req.body.summary,
      });
  
      res.status(201).json(newOrganizationItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;