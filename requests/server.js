const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require("form-data");

app.get('/api-express', async (req, res) => {

    console.log('sending request from requests server')
    const form = new FormData();
    const stream = fs.createReadStream(__dirname + '/laptop_stock.jpeg');
    form.append('image', stream);
    const formHeaders = form.getHeaders();

    axios.post('http://api-express:4000/predict', form, {
        headers: {
            ...formHeaders,
        },
    })
        .then(resp => { res.sendStatus(200) })
        .catch(error => { console.log(error) })
})

app.get('/api-flask', async (req, res) => {

    console.log('sending request from requests server')
    const form = new FormData();
    const stream = fs.createReadStream(__dirname + '/laptop_stock.jpeg');
    form.append('image', stream);
    const formHeaders = form.getHeaders();

    axios.post('http://api-flask:5000/predict', form, {
        headers: {
            ...formHeaders,
        },
    })
        .then(resp => { res.sendStatus(200) })
        .catch(error => { console.log(error.code) })
})

module.exports = app;
