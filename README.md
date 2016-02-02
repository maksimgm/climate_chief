# Nature Chief
[Heroku Link](maksim-air.herokuapp.com/home)

##Summary

The purpose of Nature Chief is to make users aware of the climate around them, its potential for harnessing solar energy, and the quality of the air. 

Nature Chief enables users to search environmental data by location. Users receive comprehensive information on the following list of data: air pollution, air quality, dominant pollutants in the air, pollution effects, annual solar data, temperature, cloud cover, weather prediction, pressure, humidity, wind speed, and ozone.

##Installation

```
1. git clone https://github.com/maksimgm/climate_chief.git

2. cd climate_chief

3. npm install
```

##Usage

1. Start a Mongo DB: `mongod`
2. Start a node server using nodemon in the apps root directory: `nodemon`
3. Visit `http://localhost:3000/`

If you do not have Mongo or Nodemon installed on your machine visit the following pages for more information: [Mongo](https://docs.mongodb.org/manual/installation/), [Nodemon](https://github.com/remy/nodemon)

##Technologies

This app uses the following technologies:

* MongoDB
* Express.js
* AngularJS
* Node.js
* Google Maps JavaScript API
* National Renewable Energy Laboratory API
* Forecast API
* BreezoMeter API
* FusionCharts
* Raphael Gauge
* Satellizer module for token based authentication