const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    Id: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
    date:Date,
    createDate: Date,
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;