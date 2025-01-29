var express = require('express');
var moment = require('moment');
const { checkBody } = require('../modules/checkbody');
var router = express.Router();
const Trip = require('../models/trips');

//GET trips
router.get('/:departure/:arrival/:date', function(req, res, next) {  
  if (!checkBody(req.params, ['departure', 'arrival', 'date'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return
  }

  const startOfDay = moment(req.params.date, 'YYYY-MM-DD').startOf('day').utc().toISOString();
  const endOfDay = moment(req.params.date, 'YYYY-MM-DD').endOf('day').utc().toISOString();
  Trip.find({'departure': {$regex: new RegExp(req.params.departure, "i")}, 'arrival': {$regex: new RegExp(req.params.arrival, "i")}, 'date': { $gte: startOfDay, $lt: endOfDay }})
  .then(data => {
    if (data.length) {
      res.json({ result: true, trips: data});
    } else {
        res.json({ result: false, error: " no trip found" });
    }
  }); 
});

module.exports = router;
