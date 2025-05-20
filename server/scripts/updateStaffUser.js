const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: '../../.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

const updateStaffUser = async () => {
  await connectDB();

  const currentEmail = 'Veggiefresh@gmail.com';
  const newEmail = 'fruits@gmail.com';
  const newPassword = 'fruits';

  try {
    // Find the staff user by their current email, explicitly selecting the password
    const user = await User.findOne({ email: currentEmail }).select('+password');

    if (!user) {
      console.log(`User with email ${currentEmail} not found.`);
      mongoose.connection.close();
      return;
    }

    if (user.role !== 'Staff') {
      console.log(`User with email ${currentEmail} is not a Staff member. Role: ${user.role}`);
      mongoose.connection.close();
      return;
    }

    console.log(`Updating user ${user.email} (${user._id})`);

    // Update email and password
    user.email = newEmail;
    user.password = newPassword; // The pre-save hook will hash this

    // Save the updated user document
    await user.save();

    console.log(`User ${newEmail} updated successfully.`);

  } catch (err) {
    console.error(`Error updating user: ${err.message}`);
  } finally {
    // Disconnect from the database
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

updateStaffUser();