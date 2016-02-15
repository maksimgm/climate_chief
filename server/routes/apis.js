var express = require("express");
var router = express.Router();
var request = require("request");

// WEATHER API CALL
router.get("/weather/:lat/:lng", function(req,res){
  console.log('BODY',req.body);
  console.log('PARAMS',req.params);

  request.get({
    url: "https://api.forecast.io/forecast/08cbb7e1d105c2fd773a9a6fe2da0d91/"+req.params.lat+','+req.params.lng,
    json: true,
  }, function(err, response) {
    res.status(200).send(response);
  });
});

module.exports = router;