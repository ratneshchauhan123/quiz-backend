// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quiz-db', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

module.exports = mongoose;
