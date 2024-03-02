// server/routes/auth.js

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: john_doe
 *             password: secret123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Log in with username and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: john_doe
 *             password: secret123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User logged in successfully
 */

const express = require('express');
const { signup, login } = require('../controllers/auth.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
