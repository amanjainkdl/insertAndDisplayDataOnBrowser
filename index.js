var express = require('express');
var empModel = require('../modules/employee.js');
var router = express.Router();
var employee = empModel.find({});

/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec(function(err,data){
    if(err){
      throw err;
    }
    res.render('index', { title: 'Employee Records', records:data });
  })  
});

router.post('/',function(req,res){

  var emplDetails = new empModel({
    name : req.body.name,
    email : req.body.email,
    etype : req.body.etype,
    ratePerHour : req.body.rateHour,
    totalHourWorked : req.body.totalhourworked,
    totalSal : parseInt(req.body.rateHour) * parseInt(req.body.totalhourworked)
  })
  
  emplDetails.save(function(err,res1){
    if(err) throw err
    employee.exec(function(err,data){
      if(err){
        throw err;
      }
      res.render('index', { title: 'Employee Records', records:data });
    })
  })

  
});

module.exports = router;
