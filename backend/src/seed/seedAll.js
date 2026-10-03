const mongoose = require('mongoose');
const connectDB = require('../config/db');
const seedAdmin = require('./seedAdmin');
const seedCategories = require('./seedCategories');
const seedProducts = require('./seedProducts');
const Cart = require('../models/Cart');
const ContactMessage = require('../models/ContactMessage');
const Order = require('../models/Order');
const Prescription = require('../models/Prescription');

const run = async () => {
  await connectDB();
  await Cart.deleteMany({});
  await ContactMessage.deleteMany({});
  await Order.deleteMany({});
  await Prescription.deleteMany({});
  await seedAdmin(false);
  await seedCategories(false);
  await seedProducts(false);
  console.log('Pill Stream database seeded successfully');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
