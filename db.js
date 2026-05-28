const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // using localhost as placeholder, this should come from process.env.MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/raithu-bazaar');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
