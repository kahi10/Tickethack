var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');

router.post('/', (req, res) => {
    const newCarte = new Cart({
        tripId: req.body._id,
    });
    newCarte.save().then(() => {
        res.json({ result: true, error: 'cart saved!' })
    });
    Cart.findOne({ _id: req.body._id })
    .populate('trips').then(data => {
        res.json({result: data});
    })
})

module.exports = router;