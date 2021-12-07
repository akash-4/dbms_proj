const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;

const config = (mongoUser && mongoUser)? {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongoUser,
        pass: mongoPass
      } :{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }

async function connectMongo() {
  try {
    mongoose.connect(
      mongoURI,
      config,
      (err) => {
        if (err) console.log(err);
        else console.log('Connected to MongoDB');
      }
    );
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  connectMongo,
};
