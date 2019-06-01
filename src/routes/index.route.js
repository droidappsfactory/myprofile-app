const express = require('express');

const router = express.Router();

const fileRoutes = require('./files.route');

router.get('/health-check', (req, res) => {
    res.send('Up and Running!');
});

router.use('/files', fileRoutes);

module.exports = router;