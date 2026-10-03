const connectDB = require('../config/db');
const slugify = require('slugify');
const Category = require('../models/Category');
const { categories } = require('./seedData');

const seedCategories = async (closeConnection = true) => {
  const created = [];
  for (const item of categories) {
    const category = await Category.findOneAndUpdate(
      { name: item.name },
      { ...item, slug: slugify(item.name, { lower: true, strict: true }), isActive: true },
      { upsert: true, new: true, runValidators: true }
    );
    created.push(category);
  }
  console.log(`${created.length} categories seeded`);
  if (closeConnection) process.exit(0);
  return created;
};

if (require.main === module) {
  connectDB().then(() => seedCategories(true)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = seedCategories;
