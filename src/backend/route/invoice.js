const express = require('express');
const router = express.Router();
const invoiceCtrl = require('../controller/invoice');
const user_auth = require('../middleware/user_auth');
const admin_auth = require('../middleware/admin_auth');

router.post('/', user_auth, invoiceCtrl.createInvoice);
router.get('/user/:id', user_auth, invoiceCtrl.getAllInvoiceofUser);
router.get('/user/:id/:year/:month', user_auth, invoiceCtrl.getInvoiceByUserYearMonth);
router.delete('/:id', admin_auth, invoiceCtrl.deleteInvoice);
router.get('/all', admin_auth, invoiceCtrl.getAllInvoices);

module.exports = router;
