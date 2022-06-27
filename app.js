const express = require('express');
const morgan = require('morgan');
const giftExchange = require('./routes/gift-exchange')
const { NotFoundError, BadRequestError } = require('./utils/errors');

const app = express();

app.use(morgan('tiny'));
app.use(express.json()); // Middleware Parsing, automatically parses incoming req
app.use('/gift-exchange', giftExchange); // Gift-exchange Route

app.get('/', (req, res) => {
    res.send({ "ping": "pong" });
    res.status(200).send('Success!');
});

app.use((req, res, next) => {
    return next(new NotFoundError);
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        error: { message: err.message, status: err.status }
    });
});

module.exports = app; 