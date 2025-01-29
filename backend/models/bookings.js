const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
    reservationDate:Date
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;