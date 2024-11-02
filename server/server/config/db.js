const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
mongoose.connect(process.env.MONGOURL || 'mongodb+srv://dharshiniramalingam2004:dharshu@ecart.ftsjm.mongodb.net/?retryWrites=true&w=majority&appName=ecart');

const connection = mongoose.connection;
connection.on('connected', () => console.log("DB Connected"))
connection.on('error', () => console.log("DB Error"))

module.exports = mongoose