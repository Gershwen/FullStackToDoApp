const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT
    };