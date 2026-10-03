const connectDB = require('./config/db');
const env = require('./config/env');
const app = require('./app');

connectDB().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Pill Stream backend running on port ${env.PORT}`);
  });
});
