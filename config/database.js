const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/node_jwt';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;