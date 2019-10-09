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

