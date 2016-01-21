var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/climate_chief");
mongoose.set("debug",true);

module.exports.User = require("./user");