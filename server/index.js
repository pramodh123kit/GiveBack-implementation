const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const donationRoutes = require('./routes/donationRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const recipientRoutes = require('./routes/recipientRoutes');
const knnService = require('./services/knnService');
const Donation = require('./models/Donation');
const Organization = require('./models/Organizations');
const Recipient = require('./models/Recipient');
const nodemailer = require('nodemailer');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/donationDB');

app.use('/donations', donationRoutes);
app.use('/recipients', recipientRoutes);
app.use('/organizations', organizationRoutes);

app.use(bodyParser.json({ limit: '10mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/donatorSubmitForm', upload.single('image'), async (req, res) => {
  try {
    const {itemType, itemName, itemDescription, itemQuantity, donorAddress, contactNumber, donorName, donorId } = req.body;

    // Save the form data to MongoDB
    const donation = new Donation({
      itemType,
      itemName,
      itemDescription,
      itemQuantity,
      donorAddress,
      contactNumber,
      donorName,
      donorId,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await donation.save();

    res.status(201).json({ message: 'Donator form submitted successfully' });
  } catch (error) {
    console.error('Error submitting Donator form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getUserDonations', async (req, res) => {
  try {
    const userId = req.query.userId; // Extract user ID from query params
    const donations = await Donation.find({ donorId: userId }); // Fetch donations with matching user ID
    const donationsWithImages = donations.map((donation) => ({
      ...donation.toObject(),
      image: donation.image && donation.image.data ? donation.image.data.toString('base64') : null,
    }));
    res.status(200).json(donationsWithImages);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/registerOrganization', upload.single('image'), async (req, res) => {
  try {
    const { orgName, address, email, contactNumber, registrationDoc, permit, type, quantity, forWho, summary } = req.body;

    const newOrganizationItem = new Organization({
      orgName,
      address,
      email,
      contactNumber,
      registrationDoc,
      permit,
      type,
      quantity,
      forWho,
      summary,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newOrganizationItem.save();

    res.status(201).json({ newOrganizationItem });
  } catch (error) {
    console.error('Error submitting recipient form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/recipientSubmitForm', async (req, res) => {
  try {
    const { itemType, itemName, itemDescription, itemQuantity, recipientAddress, recipientContactNumber } = req.body;

    const newRecipientItem = await Recipient.create({
      itemType,
      itemName,
      itemDescription,
      itemQuantity,
      recipientAddress,
      recipientContactNumber,
    });

    const closestMatch = await knnService.getClosestMatch(newRecipientItem);

    res.status(201).json({ newRecipientItem, closestMatch });
  } catch (error) {
    console.error('Error submitting recipient form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch donations
app.get('/api/getDonations', async (req, res) => {
  try {
    // Fetch all donations from MongoDB
    const donations = await Donation.find();

    // Convert images to base64 for sending in response
    const donationsWithImages = donations.map((donation) => ({
      ...donation.toObject(),
      image: donation.image && donation.image.data ? donation.image.data.toString('base64') : null,
    }));

    res.status(200).json(donationsWithImages);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getOrganizations', async (req, res) => {
  try {
    // Fetch all donations from MongoDB
    const organizations = await Organization.find();

    // Convert images to base64 for sending in response
    const OrganizationsWithImages = organizations.map((organization) => ({
      ...organization.toObject(),
      image: organization.image && organization.image.data ? organization.image.data.toString('base64') : null,
    }));

    res.status(200).json(OrganizationsWithImages);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Serve uploaded images
app.get('/api/getImage/:donationId', async (req, res) => {
  try {
    const donationId = req.params.donationId;
    const donation = await Donation.findById(donationId);

    if (!donation || !donation.image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', donation.image.contentType);
    res.send(donation.image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getOrganizationImage/:organizationId', async (req, res) => {
  try {
    // Retrieve organization information including image from the database
    const organizationId = req.params.organizationId;
    const organization = await Organization.findById(organizationId);

    if (!organization || !organization.image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', organization.image.contentType);
    res.send(organization.image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getOrganizationEmail/:organizationId', async (req, res) => {
  try {
    const organizationId = req.params.organizationId;
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.status(200).json({ email: organization.email });
  } catch (error) {
    console.error('Error fetching organization email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sendDonationEmail', upload.single('image'), async (req, res) => {
  try {
    const {
      userName,
      userContactNumber,
      userEmail,
      donationType,
      donationQuantity,
      donationReason,
      organizationEmail, // Add this field to the form or fetch it from the database
    } = req.body;

    // Save the form data to MongoDB
    const donation = new Donation({
      userName,
      userContactNumber,
      userEmail,
      donationType,
      donationQuantity,
      donationReason,
      // ... other fields
    });

    await donation.save();

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sharewithgiveback@gmail.com',
        pass: 'zlpw txvw vnsy imjk', 
      },
    });

    const mailOptions = {
      from: 'sharewithgiveback@gmail.com',
      to: organizationEmail,
      subject: 'New Donation Submission',
      html: `
        <h2>New donation request</h2>
        <h3>Details are as follows:</h3>
      
        <p>Donation Type: ${donationType}</p>
        <p>Donation Quantity: ${donationQuantity}</p>
        <p>Donation Reason: ${donationReason}</p>

        <h3>If interested, below are the details of the user:</h3>
        <p>User Name: ${userName}</p>
        <p>Contact Number: ${userContactNumber}</p>
        <p>Email: ${userEmail}</p>

        <hr>
        <p>Best regards</p>
        <p>CS-71, GiveBack Team</p>
        <img src="https://i.imgur.com/igUsVTL.png" alt="Company Logo" width="100" height="100" margin-top="-30px">
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Donation submitted successfully!' });
  } catch (error) {
    console.error('Error submitting donation form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Middleware


// Use donation routes
app.use('/api', donationRoutes);

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  const { message, user: sender, type, members } = req.body;

  if (type === 'message.new') {
    members
      .filter((member) => member.user_id !== sender.id)
      .forEach(({ user }) => {
        if (!user.online) {
          twilioClient.messages
            .create({
              body: `You have a new message from ${message.user.fullName} - ${message.text}`,
              messagingServiceSid: messagingServiceSid,
              to: user.phoneNumber,
            })
            .then(() => console.log('Message sent!'))
            .catch((err) => console.error(err));
        }
      });
    return res.status(200).send('Message sent!');
  }
  return res.status(200).send('Not a new message request');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
