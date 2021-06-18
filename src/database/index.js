import mongoose from 'mongoose';

import 'database/models/index';
import { __prod__ } from 'constants/index';

class MongooseService {
  constructor() {
    this.count = 0;
    this.DBUrl = process.env.MONGODB_URI;
    this.mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: __prod__ ? false : true,
    };
  }

  connectWithRetry = async () => {
    try {
      console.log('Attempting MongoDB connection (will retry if needed)');
      await mongoose.connect(this.DBUrl, this.mongooseOptions);
      console.log('MongoDB is connected');
    } catch (error) {
      const retrySeconds = 5;
      console.log(
        `MongoDB connection unsuccessful (will retry #${++this
          .count} after ${retrySeconds} seconds):`,
        error,
      );
      setTimeout(this.connectWithRetry, retrySeconds * 1000);
    }

    // To handle errors after initial connection is established
    if (!__prod__) {
      mongoose.connection.on('error', (err) => {
        console.log(err);
      });
    }

    // Ensure virtual fields are serialised.
    mongoose.set('toJSON', {
      virtuals: true,
    });
    mongoose.set('toObject', {
      virtuals: true,
    });
  };
}

export default new MongooseService();
