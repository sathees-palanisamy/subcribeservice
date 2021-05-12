import mongoose from 'mongoose';

import { app } from './app';
const keys = require('./config/keys');

const start = async () => {
  if (!keys.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!keys.mongoURI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(5002, () => {
    console.log('Listening on port 5002');
  });
};

start();
