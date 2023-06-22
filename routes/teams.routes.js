const express = require('express');
const { all, get, update, destroy, store } = require('../controllers/teams.controller');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: CRUD operations for Teams
 */

/**
 * @swagger
 * /api/teams/all:
 *   get:
 *     summary: Retrieve a list of all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/all', all);

/**
 * @swagger
 * /api/teams/get/{id}:
 *   get:
 *     summary: Retrieve a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A team object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
router.get('/get/:id', get);

/**
 * @swagger
 * /api/teams/store:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       description: Team object that needs to be added to the system
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               creatorUser:
 *                 type: string
 *             example:
 *               name: Team1
 *               description: Team description
 *               creatorUser: 6447d86ab30666e7f8c0e2f7
 *     responses:
 *       201:
 *         description: The created team object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 */
router.post('/store', store);

/**
 * @swagger
 * /api/teams/update/{id}:
 *   put:
 *     summary: Update a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated team object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Team2
 *               description: Team description
 *     responses:
 *       200:
 *         description: The updated team object.
 *         content:
 *           application/json:
 *             schema:
    *             type: object
    *             properties:
    *               name:
    *                 type: string
    *               description:
    *                 type: string
    *               creatorUser:
    *                 type: string
    *             example:
    *               name: Team1
    *               description: Team description
    *               creatorUser: 6447d86ab30666e7f8c0e2f7
 */
router.put('/update/:id', update);

/**
 * @swagger
 * /api/teams/delete/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/delete/:id', destroy);

module.exports = router;