const mongoose = require('mongoose');

module.exports = function connectDB(){
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gdp_records';
  mongoose.set('strictQuery', true);
  mongoose.connect(uri)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
};
