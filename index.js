
const dotenv = require("dotenv");
const connectToDatabse = require('./src/database/connect')

dotenv.config();

connectToDatabse();

require("./express");