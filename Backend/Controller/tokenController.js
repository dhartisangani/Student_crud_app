const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_TOKEN;


exports.RefreshToken = async (req, res) => {
    const refreshToken = req.header('RefreshToken');

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        const data = jwt.verify(refreshToken, JWT_SECRET);
        const { user } = data;

        // Generate a new authentication token
        const expirationTime = 60; // 4 hours in seconds
        const newToken = jwt.sign({ user }, JWT_SECRET, { expiresIn: expirationTime });

        res.json({ authtoken: newToken, expirationTime });
    } catch (error) {
        return res.status(401).json({ error: 'Please provide a valid refresh token.' });
    }
};
