const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes')
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
    })
    .catch(err => console.log(err));