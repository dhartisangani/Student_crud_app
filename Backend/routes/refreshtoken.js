const express = require('express');
const { RefreshToken } = require('../Controller/tokenController');
const router = express.Router();

// POST /refresh-token
router.post('/refresh-token', RefreshToken);

module.exports = router;
