const mongoose = require('mongoose');

const membershipSchema = mongoose.Schema({
    user_id: {type: String, required: true, unique: true},
    active: {type: Boolean, required: true}, //"Status : active / canceled"
    credit : {type: Number, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true}
});

module.exports = mongoose.model('membership', membershipSchema);

