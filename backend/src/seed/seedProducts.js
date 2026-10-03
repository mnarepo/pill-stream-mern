const connectDB = require('../config/db');
const slugify = require('slugify');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { products } = require('./seedData');

const futureExpiry = (years = 2) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return date;
};

const seedProducts = async (closeConnection = true) => {
  const categories = await Category.find({});
  const categoryMap = categories.reduce((map, category) => {
    map[category.name] = category._id;
    return map;
  }, {});

  const seeded = [];
  for (let index = 0; index < products.length; index += 1) {
    const [name, categoryName, description, price, oldPrice, brand, dosage, packSize, stock, requiresPrescription, manufacturer] = products[index];
    if (!categoryMap[categoryName]) continue;

    const product = await Product.findOneAndUpdate(
      { name },
      {
        name,
        slug: slugify(name, { lower: true, strict: true }),
        category: categoryMap[categoryName],
        description,
        price,
        oldPrice,
        brand,
        dosage,
        packSize,
        stock,
        requiresPrescription,
        manufacturer,
        image: '/uploads/products/placeholder-medicine.svg',
        expiryDate: futureExpiry(2 + (index % 2)),
        batchNumber: `PS-${String(index + 1).padStart(4, '0')}`,
        isActive: true,
        featured: index < 8 || index % 5 === 0
      },
      { upsert: true, new: true, runValidators: true }
    );
    seeded.push(product);
  }

  console.log(`${seeded.length} products seeded`);
  if (closeConnection) process.exit(0);
  return seeded;
};

if (require.main === module) {
  connectDB().then(() => seedProducts(true)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = seedProducts;
