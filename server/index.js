const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const donationRoutes = require('./routes/donationRoutes');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/donationDB');

// Use donation routes
app.use('/api', donationRoutes);

const donationSchema = new mongoose.Schema({
  itemType: String,
  itemName: String,
  itemDescription: String,
  itemQuantity: String,
  donorAddress: String,
  contactNumber: String,
  donorName: String,
  donorId: String,
  image: { data: Buffer, contentType: String },
});

const Donation = mongoose.model('Donation', donationSchema);

app.use(bodyParser.json());

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

// Middleware
app.use(express.json());

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
  console.log(`Server is running on port ${PORT}`);
});
