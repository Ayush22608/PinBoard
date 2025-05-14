import axios from 'axios';

const registerAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register-admin', {
      name: 'Admin User',
      email: 'admin@pinboard.com',
      password: 'admin123'
    });

    console.log('Admin account created successfully!');
    console.log('User data:', response.data);
  } catch (error) {
    console.error('Error creating admin account:', error.response?.data || error.message);
  }
};

registerAdmin(); 