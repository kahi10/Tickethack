var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');
const Booking = require('../models/bookings');

router.post('/', (req, res) => {
    Cart.find().then(trips => {
        if (trips.length) {
            trips.forEach(el => {
                const newBooking = new Booking({
                    tripId: el.tripId,
                    reservationDate:el.reservationDate
                })
                newBooking.save().then();
            });
            Cart.deleteMany().then();
            Booking.find().populate('tripId').then(data => {
                res.json({ result: true, data: data });
            });
        } else {
            res.json({ result: false, error: " no trip found" });
        }
    });
       
});

router.get('/', (req, res) => {
    Booking.find().populate('tripId').then(trips => {
        if (trips.length) {
            res.json({result: true, data: trips})
        } else {
            res.json({ result: false, error: " no trip found" });
        }
    });
});

module.exports = router;