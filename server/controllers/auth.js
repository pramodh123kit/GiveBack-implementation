const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber, isDonator, isRecipient } = req.body;

        const userId = crypto.randomBytes(16).toString("hex");

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        // Include roles in the response
        const roles = { isDonator: isDonator || false, isRecipient: isRecipient || false };

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber, ...roles });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if (!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(500).json({ message: "Incorrect password" });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, login };
