const express = require('express');
const router = express.Router();
const Controller = require('../controller/Controller');

router.get('/djakafe', Controller.getKafe);
router.get('/djakafe/:id', Controller.getKafe);
router.get('/recommendation', Controller.getSuggestion);

module.exports = router;