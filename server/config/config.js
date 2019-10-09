require('dotenv').config();
var mongoose = require('mongoose');
try{
    mongoose.connect(process.env.DB_URL+process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
} catch (erroe) {
  handleError(erroe);
}

module.exports = mongoose;
