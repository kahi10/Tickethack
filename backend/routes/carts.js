var express = require('express');
var router = express.Router();
const Cart = require('../models/carts');
const { checkBody } = require('../modules/checkbody');

router.post('/', (req, res) => {
    if (!checkBody(req.body, ['_id'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return
    }

    const newCarte = new Cart({
        tripId: req.body._id,
    });
    newCarte.save().then(() => {
        Cart.findOne({ tripId: req.body._id })
        .populate('tripId').then(data => {
            res.json({ result: true, data: data })
        })
    });
});

router.get('/', (req, res) => {
    Cart.find().populate('tripId').then(trips => {
        if (trips.length) {
            res.json({result: true, data: trips})
        } else {
            res.json({ result: false, error: " no trip found" });
        }
    })
});

router.delete('/', (req, res) => {
    if (!checkBody(req.body, ['_id'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return
    }

    Cart.deleteOne({_id: req.body._id}).then(()=> {
        Cart.find().populate('tripId').then(data => {
            res.json({ result: true, data: data})
          });
    })
})

module.exports = router;