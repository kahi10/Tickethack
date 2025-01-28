var express = require('express');
const { checkBody } = require('../modules/checkbody');
var router = express.Router();
const Trip = require('../models/trips');

//GET trips
router.get('/', function(req, res, next) {
  if (!checkBody(req.body, ['departure', 'arrival', 'date'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
        return
  }
  Trip.find({'departure': {$regex: new RegExp(req.body.departure, "i")}, 'arrival': {$regex: new RegExp(req.body.arrival, "i")}})
  .then(data => {
    if (data.length) {
      //console.log(data[0].toString().includes(req.body.date.split('/').reverse().join('-')))
        //let newData = data.filter(el => el.date.toString().includes(req.body.date.split('/').reverse().join('-')));
        console.log(newData)
        if (newData.length) {
          res.json({ result: true, trip: newData}); 
        }
    } else {
        res.json({ result: false, error: " no trip found" });
    }
  }); 
});

module.exports = router;
