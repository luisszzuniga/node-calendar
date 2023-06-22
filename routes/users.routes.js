const express = require('express');
const { all, get, update, updatePassword, destroy, getAllUsersOfTeam } = require('../controllers/users.controller');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
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
 * /api/users/all:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/all', verifyToken, all);

/**
 * @swagger
 * /api/users/get/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 */
router.get('/get/:id', get);

/**
 * @swagger
 * /api/users/get-all-users-of-team/{teamId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users of a team
 *     description: Retrieve a list of all users belonging to a team
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: string
 *         description: ID of the team to retrieve users from
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '404':
 *         description: Team not found
 */
router.get('/get-all-users-of-team/:teamId', getAllUsersOfTeam)

/**
 * @swagger
* /api/users/update/{id}:
*   put:
*     tags:
*       - Users
*     summary: Update user by ID
*     description: Update a user by ID
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         description: ID of the user to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       '200':
*         description: OK
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       '404':
*         description: User not found
*/
router.put('/update/:id', verifyToken, update);

/**
* @swagger
* /api/users/update-password/{id}:
*   put:
*     summary: Update user's password.
*     tags:
*       - Users
*     parameters:
*       - in: path
*         name: id
*         description: ID of the user to update.
*         required: true
*         schema:
*           type: string
*           format: uuid
*       - in: body
*         name: password
*         description: The new password for the user.
*         required: true
*         schema:
*           type: object
*           properties:
*             password:
*               type: string
*     responses:
*       200:
*         description: The updated user object.
*         schema:
*           $ref: '#/definitions/User'
*       400:
*         description: Invalid request body or user ID.
*       404:
*         description: User not found.
*/
router.put('/update-password/:id', verifyToken, updatePassword);

/**
* @swagger
* /api/users/destroy/{id}:
*   delete:
*     summary: Delete a user.
*     tags:
*       - Users
*     parameters:
*       - in: path
*         name: id
*         description: ID of the user to delete.
*         required: true
*         schema:
*           type: string
*           format: uuid
*     responses:
*       200:
*         description: Success message.
*         schema:
*           type: object
*           properties:
*             message:
*               type: string
*       400:
*         description: Invalid user ID.
*       404:
*         description: User not found.
*/
router.delete('/destroy/:id', verifyToken, destroy);

module.exports = router;