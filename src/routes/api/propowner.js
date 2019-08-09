const express = require('express');

const router = express.Router();

const propownerController = require('../../controllers/propownerController');

router.post('/', propownerController.process);

module.exports = router;