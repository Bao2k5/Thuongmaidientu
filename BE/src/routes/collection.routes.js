// src/routes/collection.routes.js
const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection.controller');

router.get('/', collectionController.listCollections);
router.get('/:slug', collectionController.getCollectionBySlug);

module.exports = router;
