require('dotenv').config();

const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const corsOptions = require('./config/cors_options');
const { authenticate } = require('./middleware/auth_middleware');
const PORT = process.env.PORT || 5000;
const path = require("path");

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

// Serving static content such as images
app.use('/static', express.static(path.join(__dirname, "./public/")));

app.use('/api/auth', require('./routes/auth_routes'));
app.use('/api/products', require('./routes/product_routes'));
app.use('/api/categories', require('./routes/category_routes'));
app.use('/api/compatibilities', require('./routes/compatibility_routes'));
app.use(authenticate);
app.use('/api/users', require('./routes/users_routes'));
app.use('/api/cart', require('./routes/cart_routes'));
app.use('/api/order', require('./routes/order_routes'));

mongoose.connection.once('open', () => {
    console.log('Connected to the db');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
    //logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrorLog.log');
});