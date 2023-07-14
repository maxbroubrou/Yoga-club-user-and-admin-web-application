const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    date: {type: Date, required: true},
    status: {type: String, required: true, default: "outstanding"}, //"Status : outstanding / paid / void"
    description: {type: String, required: true},
    total_amount: {type: Number, required: true},
    invoices_lines: {type: Array, required: true}
});

module.exports = mongoose.model('invoice', invoiceSchema);

