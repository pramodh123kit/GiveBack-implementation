const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');  
const swaggerSpec = require('./swagger');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/community', (req, res) => {
  res.json({ message: 'Community data fetched from the backend' });
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
              to: user.phoneNumber  
            })
            .then(() => console.log('Message sent!'))
            .catch((err) => console.error(err));
        }
      })
    return res.status(200).send('Message sent!');
  }
  return res.status(200).send('Not a new message request');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});