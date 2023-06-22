const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for managing auth
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         team_id:
 *           type: string
 *           description: The team ID to which the user belongs
 * 
 *   responses:
 *     Success:
 *       description: Success response
 *     NotFound:
 *       description: Resource not found
 *     BadRequest:
 *       description: Bad request
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               password: password123
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 username: johndoe
 *                 email: john_doe@example.com
 *                 password: password123
 */
router.post('/login', (req, res) => {
    login(req, res);
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm_password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               email: john_doe@example.com
 *               password: password123
 *               confirm_password: password123
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 username: johndoe
 *                 email: john_doe@example.com
 *                 password: password123
 */
router.post('/register', (req, res) => {
    register(req, res);
});

module.exports = router;