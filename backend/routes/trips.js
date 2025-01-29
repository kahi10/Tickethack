var express = require('express');
var moment = require('moment');
const { checkBody } = require('../modules/checkbody');
var router = express.Router();
const Trip = require('../models/trips');

//GET trips
router.get('/', function(req, res, next) {
  if (!checkBody(req.body, ['departure', 'arrival', 'date'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return
  }

  const startOfDay = moment(req.body.date, 'DD/MM/YYYY').startOf('day').utc().toISOString();
  const endOfDay = moment(req.body.date, 'DD/MM/YYYY').endOf('day').utc().toISOString();
  
  Trip.find({'departure': {$regex: new RegExp(req.body.departure, "i")}, 'arrival': {$regex: new RegExp(req.body.arrival, "i")}, 'date': { $gte: startOfDay, $lt: endOfDay }})
  .then(data => {
    if (data.length) {
      res.json({ result: true, data: data});
    } else {
        res.json({ result: false, error: " no trip found" });
    }
  }); 
});

module.exports = router;
