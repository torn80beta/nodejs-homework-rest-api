const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log(
      'Connection to database has been established. Listening on port 3000'
    );
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
