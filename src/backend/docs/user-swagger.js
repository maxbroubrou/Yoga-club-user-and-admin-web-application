/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The mongodb auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user email
 *         name:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: the user password
 *       example:
 *         _id: 63c484a08edbf923272e9c14
 *         email: maxime@gmail.com
 *         name: Maxime
 *         password: encrypted
 * tags:
 *   name: User
 *   description: The users managing API
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - email
 *              - name
 *              - password
 *           properties:
 *             email:
 *               type: string
 *               description: The user email
 *             name:
 *               type: string
 *               description: The user name
 *             password:
 *               type: string
 *               description: the user password
 *           example:
 *             email: maxime@gmail.com
 *             name: Maxime
 *             password: encrypted
 *     responses:
 *       201:
 *         description: The user was created.
 *         content:
 *           application/json:
 *             schema:
 *             type: string
 *             example: 
 *               message : User created
 *       400:
 *         description: invalid request
 *       500:
 *         description: Some server error
 * /user/login:
 *   post:
 *     summary: Check user credentials and return a token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - email
 *              - password
 *           properties:
 *             email:
 *               type: string
 *               description: The user email
 *             password:
 *               type: string
 *               description: the user password
 *           example:
 *             email: maxime@gmail.com
 *             password: encrypted
 *     responses:
 *       200:
 *         description: Correct credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             required:
 *               - userId
 *               - name
 *               - email
 *               - token
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The mongodb auto-generated id
 *               name:
 *                 type: string
 *                 description: The user name
 *               email:
 *                 type: string
 *                 description: The user email
 *               token:
 *                 type: string
 *                 description: The auth token
 *             example:
 *               userId: 63c484a08edbf923272e9c14
 *               name: Maxime
 *               email: maxime@gmail.com
 *               token: fhrvjc783fkugdkrvslsr5g5gdr6gvd2r
 *       401:
 *         description: incorrect credentials
 *       500:
 *         description: Some server error
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     parameters:
 *      - in: header
 *        name: ADMIN Authorization Token
 *        schema:
 *          type: string
 *          description: The ADMIN auth token
 *        required: true
 *        example: fhrvjc783fkugdkrvslsr5g5gdr6gvd2r 
 *     responses:
 *       200:
 *         description: an object of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       400:
 *         description: invalid request
 *       401:
 *         description: unauthorized
 */