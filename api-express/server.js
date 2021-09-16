const express = require('express');
const app = express();

app.post('/predict', async (req, res) => {
    res.sendStatus(200);
})

module.exports = app;
