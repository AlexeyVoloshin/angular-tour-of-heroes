const Heroes = require('../heroes/heroesModel');
//const mongoose = require('../config/config');
//mongoose.connection;

exports.getHeroes = function (req, res) {
  Heroes.find({}, function(err, docs){

    if(err) return console.log(err);
    res.send(docs) ;

  });
};

exports.searchHeroes = function (req, res) {

  Heroes.find({$text: {$search: req.params.name}}, function(err, docs){

    if(err) return console.log(err);
    res.send(docs) ;

  });
};

exports.createHero = function(req, res){
  if(!req.body.name){
    res.send("No form data");
      return;
    }
  Heroes.create(
    {
      name: req.body.name,
      gender: req.body.gender
    }, function(err, doc){
    if(err) return console.log(err);
    res.send("Data saved");
  });
};

exports.HeroesDetails = function (req, res) {

  Heroes.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  })
};

exports.updateHero = function (req, res){
  console.log("Id hero for update", req.params.id);
    Heroes.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, hero) {
      if(err) return next(err);
      res.send('Hero update');
    })
};

exports.deleteHero = function (req, res){
  Heroes.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully');
  });
};
