/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * This file is licensed under terms of Apache License v2.0
 * The full text of Apache v2 license is providded in file named LICENSE,
 * residing in the root folder of this project, and is available online at 
 * https://www.apache.org/licenses/LICENSE-2.0
 */

const express = require('express');
const mongodb = require('mongodb');
const indicative = require('indicative');
const error = require('./helpers').error;
const replaceId = require('./helpers').replaceId;
const util = require('util');
const router = express.Router();
const ObjectID = mongodb.ObjectID;

router.get('/', function(req, res) {
    const db = req.app.locals.db;
    db.collection('articles').find().toArray().then(articles => {
        res.json(articles.map(a => replaceId(a)));
    });
    // res.json([{title:'Article 1', content: 'Content 1 ...'},
    // {title:'Article 2', content: 'Content 2 ...'}]);
});

router.get('/:id', function(req, res) {
    const params = req.params;
    const db = req.app.locals.db;
    indicative.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('articles').findOne({_id: new ObjectID(params.id)})
            .then(article => {
                if(article) {
                    replaceId(article);
                    res.json(article);
                } else {
                    error(req, res, 404, `Invalid article ID: ${params.id}`)
                }
            });
        }).catch(err => error(req, res, 404, 
            `Invalid article ID: ${params.id}. Id should have 24 hexadecimal characters.`, err));
});

router.post('/', (req, res) => {
    const db = req.app.locals.db;
    const article = req.body;
    indicative.validate(article, 
        { 
            id: 'regex:^[0-9a-f]{24}$',
            title: 'required|string|min:2',
            content: 'required|string|min:2',
            author: 'regex:^[0-9a-f]{24}$',
            imageUrl: 'url'
     })
    .then(article => {
        console.log("Inserting article: ", article);
        db.collection('articles').insertOne(article).then(result => {
            if(result.result.ok && result.insertedCount === 1) {
                replaceId(article);
                const uri = req.baseUrl + '/' + article.id
                res.location(uri).status(201).json(article);
            }
        });
    }).catch(err => error(req, res, 400, 
        `Invalid article: ${util.inspect(err)}`, err));
});

router.put('/:id', (req, res) => {
    const db = req.app.locals.db;
    const params = req.params;
    const article = req.body;
    if(params.id !== article.id) {
        error(req, res, 404, `Article ID does not match: ${params.id} vs. ${article.id} `)
    }
    indicative.validate(article, 
        { 
            id: 'required|regex:^[0-9a-f]{24}$',
            title: 'required|string|min:2',
            content: 'required|string|min:2',
            author: 'required|regex:^[0-9a-f]{24}$',
            imageUrl: 'url'
     })
    .then(article => {
        console.log("Inserting article: ", article);
        article._id = new ObjectID(article.id);
        delete (article.id);
        db.collection('articles').updateOne({ _id: article._id }, {"$set": article} )
        .then(result => {
            console.log("Article to insert: ", article);
            if(result.result.ok && result.modifiedCount === 1) {
                replaceId(article);
                res.status(200).json(article);
            }
        });
    }).catch(err => error(req, res, 400, 
        `Invalid article: ${util.inspect(err)}`, err));
});

router.delete('/:id', function(req, res) {
    const params = req.params;
    const db = req.app.locals.db;
    indicative.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('articles').findOneAndDelete({_id: new ObjectID(params.id)})
            .then(({ value }) => {
                if(value) {
                    replaceId(value);
                    res.json(value);
                } else {
                    error(req, res, 404, `Invalid article ID: ${params.id}`)
                }
            });
        }).catch(err => error(req, res, 404, 
            `Invalid article ID: ${params.id}. Id should have 24 hexadecimal characters.`, err));
});

module.exports = router;