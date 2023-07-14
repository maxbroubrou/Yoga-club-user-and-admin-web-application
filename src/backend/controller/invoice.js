const Invoice = require('../models/invoice');

exports.createInvoice = (req, res, next) => {
    console.log("Invoice Post test");
    // console.log(req.body)
    const invoiceObject = req.body;
    // console.log(invoiceObject);
    const m = new Invoice({
        ...invoiceObject
    });
    m.save()
    .then(() => res.status(201).json({message: 'Post saved!'}))
    .catch(error => res.status(400).json({error}));
};

exports.getAllInvoices = (req, res, next) => {
    console.log("Get all invoices");
    Invoice.find()
    .then(invoice => res.status(200).json(invoice))
    .catch(error => res.status(404).json({error}));
};

exports.getAllInvoiceofUser = (req, res, next) => {
    console.log("Get all invoice of user");
    Invoice.find({user_id: req.params.id}) //id is the user_id
    .then(invoice => res.status(200).json(invoice))
    .catch(error => res.status(404).json({error}));
};

// exports.getSpecificInvoice = (req, res, next) => {
//     console.log("Get specific invoice2");
//     Invoice.findOne({_id: req.params.id}) //id is the invoice_id
//     .then(invoice => res.status(200).json(invoice))
//     .catch(error => res.status(404).json({error}));
// };

exports.getInvoiceByUserYearMonth = (req, res, next) => {
    console.log("Get invoice by user year month");
    Invoice.find({user_id: req.params.id, year: req.params.year, month: req.params.month})
    .then(invoice => res.status(200).json(invoice))
    .catch(error => res.status(404).json({error}));
};

exports.deleteInvoice = (req, res, next) => {
    console.log("Delete invoice");
    Invoice.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Deleted!'}))
    .catch(error => res.status(400).json({error}));
};

// exports.updateInvoiceLines = (req, res, next) => {
//     console.log("update invoice lines");
//     //update invoices_lines and total_amount
//     Invoice.updateOne(
//         {_id: req.params.id},
//         {invoice_lines: req.body.invoice_lines, total_amount: req.body.total_amount}) //id is the invoice_id
//     .then(() => res.status(200).json({message: 'Put saved!'}))
//     .catch(error => res.status(400).json({error}));
// };