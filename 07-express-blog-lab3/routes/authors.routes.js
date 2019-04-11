const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    const db = req.app.locals.db;
    db.collection('authors').find().toArray().then(authors => {
        res.json(authors);
    });
});

module.exports = router;