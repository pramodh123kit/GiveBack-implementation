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
const Feedback = require('./models/Feedback');
const nodemailer = require('nodemailer');

const app = express();

// Enabling CORS
app.use(cors());
app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb+srv://pramodh123kit:mbk0rtG4jOr5I3X1@cluster0.k4yd2h3.mongodb.net/Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/donations', donationRoutes);
app.use('/recipients', recipientRoutes);
app.use('/organizations', organizationRoutes);

// app.use(express.static(path.join(__dirname, '../giveback-frontend-manager/dist')));

// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../giveback-frontend-manager/dist', 'index.html'));
// });

app.use(bodyParser.json({ limit: '20mb' }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.put('/api/updateDonation/:donationId', async (req, res) => {
  const { donationId } = req.params;
  const updatedData = req.body;

  try {
    // Find the donation item by ID
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation item not found' });
    }

    // Update the donation item with the new data
    Object.keys(updatedData).forEach(key => {
      if (updatedData[key] !== undefined) {
        donation[key] = updatedData[key];
      }
    });

    // Save the updated donation item
    await donation.save();

    res.json({ message: 'Donation item updated successfully', donation });
  } catch (error) {
    console.error('Error updating donation item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/deleteDonation/:donationId', async (req, res) => {
  try {
    const donationId = req.params.donationId;
    
    const deletedDonation = await Donation.findByIdAndDelete(donationId);
    
    if (!deletedDonation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/donatorSubmitForm', upload.single('image'), async (req, res) => {
  try {
    const {itemType, itemName, itemDescription, itemQuantity, donorAddress, contactNumber, email, donorName, donorId } = req.body;

    // Saving the form data to MongoDB
    const donation = new Donation({
      itemType,
      itemName,
      itemDescription,
      itemQuantity,
      donorAddress,
      contactNumber,
      email,
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
    const userId = req.query.userId; 
    const donations = await Donation.find({ donorId: userId }); 
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

    const donations = await Donation.find();

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
    // Fetching all donations from MongoDB
    const organizations = await Organization.find();

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


// Serving uploaded images
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
    // Retrieving organization information including image from the database
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


app.post('/api/submitFeedback/:donationId', async (req, res) => {
  try {
    const { feedbackText, userId } = req.body;
    const donationId = req.params.donationId;
    
    
    const feedback = new Feedback({
      donationId,
      feedbackText,
      recipientId: userId
    });
    await feedback.save();

    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch the feedback data
app.get('/api/getFeedback', async (req, res) => {
  try {
    // Fetch feedback data from the database
    const feedback = await Feedback.find({ recipientId: req.query.userId });

    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
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
      organizationEmail, 
    } = req.body;

    // Saving the form data to MongoDB
    const donation = new Donation({
      userName,
      userContactNumber,
      userEmail,
      donationType,
      donationQuantity,
      donationReason,
    });

    await donation.save();

    // Sending email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'givebacksdgp@gmail.com',
        pass: 'zkbo nbke kvei thky', 
      },
    });

    const mailOptions = {
      from: 'givebacksdgp@gmail.com',
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

app.post('/api/acceptDonation/:donationId', async (req, res) => {
  try {
    const donationId = req.params.donationId;
    const recipientName = req.body.recipientName;
    const recipientContactNumber = req.body.recipientContactNumber;
    const recipientEmail = req.body.recipientEmail;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    const donorEmail = donation.email;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'givebacksdgp@gmail.com',
        pass: 'zkbo nbke kvei thky', 
      },
    });

    const mailOptions = {
      from: 'givebacksdgp@gmail.com',
      to: donorEmail,
      subject: 'Your Donation Has Been Accepted',
      html: `
        <h2>Your Donation Has Been Accepted!</h2>
        <p>Thank you for your donation. It has been accepted by ${recipientName}.</p>
        <p>Item Type: ${donation.itemType}</p>
        <p>Item Name: ${donation.itemName}</p>
        <p>Item Description: ${donation.itemDescription}</p>
        <p>Item Quantity: ${donation.itemQuantity}</p>
        <p>Recipient's name: ${recipientName}</p>     
        <hr>
        <p>Best regards</p>
        <p>CS-71, GiveBack Team</p>
        <img src="https://i.imgur.com/igUsVTL.png" alt="Company Logo" width="100" height="100" margin-top="-30px">
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    donation.status = 'Accepted';
    await donation.save();

    res.status(200).json({ message: 'Donation accepted successfully!' });
  } catch (error) {
    console.error('Error accepting donation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sendFeedbackToDonator/:donationId', async (req, res) => {
  try {
    const { feedbackText } = req.body;
    const donationId = req.params.donationId;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    const donatorEmail = donation.email;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'givebacksdgp@gmail.com',
        pass: 'zkbo nbke kvei thky', 
      },
    });

    const mailOptions = {
      from: 'givebacksdgp@gmail.com', 
      to: donatorEmail,
      subject: 'Feedback Received for Your Donation',
      html: `
        <h2>Feedback Received for Your Donation</h2>
        <p>Thank you for your donation. Feedback has been received from the recipient:</p>
        <p>Feedback: ${feedbackText}</p>
        </br>
        <p><b>Donated item's information</b></p>
        <p>Item Type: ${donation.itemType}</p>
        <p>Item Name: ${donation.itemName}</p>
        <p>Item Description: ${donation.itemDescription}</p>
        <p>Item Quantity: ${donation.itemQuantity}</p>
        <hr>
        <p>Best regards</p>
        <p>CS-71, GiveBack Team</p>
        <img src="https://i.imgur.com/igUsVTL.png" alt="Company Logo" width="100" height="100" margin-top="-30px">
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Feedback sent to donator successfully!' });
  } catch (error) {
    console.error('Error sending feedback to donator:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/send-email', (req, res) => {

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'givebacksdgp@gmail.com',
      pass: 'zkbo nbke kvei thky', 
  }
});

const { name, email, message } = req.body;

const mailOptions = {
    from: 'givebacksdgp@gmail.com',
    to: 'givebacksdgp@gmail.com',
    subject: 'New message from your website',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
        console.log('Email sent:', info.response);
        res.json({ success: true, message: 'Email sent successfully' });
    }
});
});



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

app.get('/home', (req, res) => {
  res.send('Home page');
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