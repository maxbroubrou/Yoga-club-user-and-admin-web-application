/**
 * @swagger
 * components:
 *   schemas:
 *     Invoices:
 *       type: object
 *       required:
 *         - user_id
 *         - year
 *         - month
 *         - date
 *         - status
 *         - description
 *         - total_amount
 *         - invoices_lines
 *       properties:
 *         _id:
 *           type: string
 *           description: The mongodb auto-generated id of the user
 *         user_id:
 *           type: string
 *           description: The user id
 *         year:
 *           type: integer
 *           description: The year of the invoice
 *         month:
 *           type: integer
 *           description: The month of the invoice
 *         date:
 *           type: date
 *           description: The date of the invoice
 *         status:
 *           type: string
 *           description: The status of the invoice (outstanding / paid / void)
 *         description:
 *           type: string
 *           description: The description of the invoice
 *         total_amount:
 *           type: integer
 *           description: The total amount of the invoice
 *         invoices_lines:
 *           type: array
 *           description: The invoice details
 *       example:
 *         _id: 67f9f5b5b8e9b8c2b1c8b8b8b
 *         userId: 63c484a08edbf923272e9c14
 *         year: 2020
 *         month: 10
 *         date: 2020-10-28T22:00:00.000Z
 *         status: outstanding
 *         description: Invoice for October 2020
 *         total_amount: 100
 *         invoices_lines: [
 *            {
 *              item_id: 1,
 *              description: Yoga session - 2020-10-28,
 *              amount: 100
 *            }
 *         ]
 * tags:
 *   name: Invoice
 *   description: The invoice managing API
 */