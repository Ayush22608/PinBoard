import mongoose from 'mongoose';
import { User } from '../server/src/models/User.ts';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/poster-website';

async function makeAdmin() {
  await mongoose.connect(MONGODB_URI);
  const user = await User.findOneAndUpdate(
    { email: 'admin@pinboard.com' },
    { role: 'admin' },
    { new: true }
  );
  if (user) {
    console.log('User updated to admin:', user);
  } else {
    console.log('User not found.');
  }
  await mongoose.disconnect();
}

makeAdmin(); 