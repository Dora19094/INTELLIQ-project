const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/intelliQ', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
});

connection.on('error', function(err) {
  console.log("MongoDB connection error: ", err);
  process.exit(-1);
});

module.exports = connection;
