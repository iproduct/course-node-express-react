const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').sendErrorResponse;

// GET tests list 
router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('tests').find().toArray(
        function (err, docs) {
            if (err) throw err;
            res.json(docs.map((test) => {
                test.id = test._id;
                delete (test._id);
                return test;
            }));
        }
    );
});

// GET tests list 
router.get('/:testId', function (req, res) {
    const db = req.app.locals.db;
    db.collection('tests', function (err, tests_collection) {
        if (err) throw err;
        tests_collection.findOne({ _id: new mongodb.ObjectID(req.params.testId) },
            (err, test) => {
                if (err) throw err;
                if (test === null) {
                    error(req, res, 404, `Test with Id=${req.params.testId} not found.`);
                } else {
                    test.id = test._id;
                    delete (test._id);
                    res.json(test);
                }

            });
    });
});

// Create new test
router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const test = req.body;
    const collection = db.collection('tests');
    console.log('Inserting test:', test);
    collection.insertOne(test).then((result) => {
        if (result.result.ok && result.insertedCount === 1) {
            const testUri = req.baseUrl + '/' + test._id;
            res.json(replaceId(test)).created(testUri);
        } else {
            error(req, res, 400, `Invalid test data: ${test}`);
        }
    }).
        catch((err) => {
            error(req, res, 500, `Server error: ${err}`);
        });
});

module.exports = router;