const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// DB connect
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) console.log("Error: !!!" + error);
    else console.log('conncted to MongoDB!');
});

// const url = 'mongodb://127.0.0.1:27017'

//  mongoose.connect(
//   `${url}/notepad-app`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (error, client) => {
//     if (error) console.log("Error: !!!" + error);
//     else console.log('conncted to DB!');
// });
