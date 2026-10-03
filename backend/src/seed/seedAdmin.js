const connectDB = require('../config/db');
const User = require('../models/User');

const seedAdmin = async (closeConnection = true) => {
  const adminData = {
    name: 'Admin',
    email: 'admin@pillstream.com',
    password: 'Admin@123',
    role: 'admin',
    isVerified: true,
    phone: '03000000000',
    city: 'Lahore',
    address: 'BISMILLAH Pharmacy admin office'
  };

  const existing = await User.findOne({ email: adminData.email });
  if (existing) {
    existing.name = adminData.name;
    existing.role = adminData.role;
    existing.isVerified = true;
    existing.phone = adminData.phone;
    existing.city = adminData.city;
    existing.address = adminData.address;
    existing.password = adminData.password;
    await existing.save();
    console.log('Admin user updated');
  } else {
    await User.create(adminData);
    console.log('Admin user created');
  }

  if (closeConnection) process.exit(0);
};

if (require.main === module) {
  connectDB().then(() => seedAdmin(true)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = seedAdmin;
