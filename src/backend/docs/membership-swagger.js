/**
 * @swagger
 * components:
 *   schemas:
 *     Memberships:
 *       type: object
 *       required:
 *         - user_id
 *         - active
 *         - credit
 *         - start_date
 *         - end_date
 *       properties:
 *         _id:
 *           type: string
 *           description: The mongodb auto-generated id of the user
 *         user_id:
 *           type: string
 *           description: The user id
 *         active:
 *           type: boolean
 *           description: The membership status (active or canceled)
 *         credit:
 *           type: integer
 *           description: The membership credit
 *         start_date:
 *           type: date
 *           description: The membership start date
 *         end_date:
 *           type: date
 *           description: The membership end date
 *       example:
 *         _id: 5f9f5b5b8e9b8c2b1c8b8b8b
 *         userId: 63c484a08edbf923272e9c14
 *         active: true
 *         credit: 3
 *         start_date: 2020-10-28T22:00:00.000Z
 *         end_date: 2020-11-28T22:00:00.000Z
 * tags:
 *   name: Membership
 *   description: The membership managing API
 * /membership:
 *   post:
 *     summary: Create a new membership
 *     tags: [Membership]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Memberships'
 *     responses:
 *       201:
 *         description: The membership was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Memberships'
 *       400:
 *         description: The membership was not created
 */