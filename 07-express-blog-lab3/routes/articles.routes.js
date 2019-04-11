const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.json([{title:'Article 1', content: 'Content 1 ...'},
    {title:'Article 2', content: 'Content 2 ...'}]);
});

module.exports = router;