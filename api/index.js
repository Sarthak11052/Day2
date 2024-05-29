const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Cookies = require('cookies');
const cookieParser = require('cookie-parser');
const user = require('./models/Users');
dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
);

app.use(express.json());
app.use(cookieParser());


app.get('/test', (req, res) => {
    res.json('test ok');
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
        if (err) throw err;
        res.json(userData);
    });
});
// app.get('/profile', (req, res) => {
//     const { token } = req.cookies;
//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
//     jwt.verify(token, jwtSecret, {}, (err, userData) => {
//         if (err) return res.status(403).json({ error: 'Forbidden' });
//         res.json(userData);
//     });
// });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;


    try {
        const createdUser = await user.create({ username, password });

        jwt.sign({ userId: createdUser._id }, jwtSecret, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
            });
        });


    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }

});
app.listen(4040);

