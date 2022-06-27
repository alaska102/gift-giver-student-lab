const express = require('express');
const router = express.Router();
const GiftExchange = require('../models/gift-exchange');
const { BadRequestError } = require('../utils/errors');

router.use(express.json());

router.post('/', (req, res, next) => {
    res.send("Hello");
})

router.post('/pairs', async (req, res, next) => {
    try {
        let names = req.body.names;
        if (!names || names.length == 0) {
            next(new BadRequestError("Must be array"));
        }

        const pairings = GiftExchange.pairs(names);
        res.status(200).send(pairings);
    }
    catch (err) {
        next(err);
    }
});

router.post('/traditional', async (req, res, next) => {
    try {
        let names = req.body.names;
        if (!names || names.length == 0) {
            next(new BadRequestError("Must be array"));
        }

        const pairings = GiftExchange.traditional(names);
        res.status(200).send(pairings);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;