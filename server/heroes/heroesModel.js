//var config = require('../config/config');
//var ObjectID = require('mongodb').ObjectID;
var mongoose = require('../config/config');

Schema = mongoose.Schema;

var HeroesSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  gender: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Heroes', HeroesSchema);














// const db = require('mongodb').MongoClient;
//
// requireHeroes =() =>
// {
//   db.connect(config.url, (err, database) => {
//   if(err) throw err;
//   console.log("Database created!");
//   var dbo = database.db(config.nameDb);
//   //console.log("name", config.nameDb);
//   dbo.collection("users").find({}).toArray( function(err, result) {
//     if(err) throw err;
//     console.log("result", result);
//     database.close();
//     return result;
//   });
// })
// };
// requireHeroes();
// getHero = (req, res) =>{db.connect(config.url, (err, database) => {
//   if(err) return console.log(err);
//   console.log("Database created!");
//   var dbo = database.db(config.nameDb);
//   dbo.collection("users").find({}).toArray( function(err, result) {
//     if(err) return console.log(err);
//     console.log(result.name);
//     database.close();
//     return result.name;
//   });
// })};

// module.exports = {
//   requireHeroes,
// //   //getHero
// };
