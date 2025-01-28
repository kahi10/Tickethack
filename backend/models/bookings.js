const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
    createDate: Date,
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;