const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require("form-data");

app.get('', async (req, res) => {

    console.log('recieved request to request server')
    const form = new FormData();
    const stream = fs.createReadStream(__dirname + '/laptop_stock.jpeg');
    form.append('image', stream);
    const formHeaders = form.getHeaders();

    axios.post('http://localhost:5000/predict', form, {
        headers: {
            ...formHeaders,
        },
    })
        .then(resp => { console.log(resp.data); res.send(resp.data) })
        .catch(error => error)
})

module.exports = app;
