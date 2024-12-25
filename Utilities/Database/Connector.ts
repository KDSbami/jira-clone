import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectToMongoDB;
