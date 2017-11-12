var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
require('babel-register');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var mongoose = require('mongoose');
var config = require('./config');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var Character = require('./models/character');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});
/**
 * GET /api/characters
 * Returns 2 random characters of the same gender that have not been voted yet.
 */
app.get('/api/characters', function(req, res, next) {
  Character.find({})
      .exec(function(err, characters) {
      if (err) return next(err);
      return res.send(characters);
    });
});
/**
 * POST /api/deleteCharacter
 * Delete a  character from the database.
 */
app.post('/api/deleteCharacter', function(req, res, next) {
    var characterId = req.body.characterId;
    Character.deleteOne({ characterId: characterId }, function(err) {
      if (err) return next(err);
      return res.status(200).send({ message:' This face  has been deleted  successfully!' });
    });
});
/**
 * POST /api/characters
 * Adds new character to the database.
 */
app.post('/api/characters', function(req, res, next) {
  var gender = req.body.gender;
  var characterName = req.body.name;
  var password = req.body.password;
  var character = new Character({
                characterId: [Math.random(), 0],
                name: characterName,
                password: password,
                gender: gender,
                random: [Math.random(), 0]
              });
              character.save(function(err) {
                if (err) return next(err);
                res.send({ message: characterName + ' has been added successfully!' });
              });
});

// Calling react route
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

var server = require('http').createServer(app);


server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
