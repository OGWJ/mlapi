const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require("form-data");
const { send } = require('process');

// app.get('', async (req, res) => {

//     // const file = fs.readFileSync(path.join(__dirname, 'laptop_stock.jpeg'));
//     // console.log(typeof (file));

//     // if (!file) console.log('failed to load file');

//     let formData = new FormData();
//     // formData.append('image', file, { filename: 'laptop_stock.jpeg' });
//     formData.append('image', fs.createReadStream(__dirname + '/laptop_stock.jpeg'), 'laptop_stock.jpeg');
//     // formData.append('test', 'success')
//     console.log(formData);

//     // formData.entries().forEach(entry => console.log(entry));

//     const url = 'http://localhost:5000/predict';
//     const config = {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     }

//     await axios.post(url, formData, config)
//         .then(resp => console.log('done'))//console.log(resp))
//         .catch(err => console.log(err.message));//console.log(err.message))

//     res.sendStatus(200);

// })

app.get('', async (req, res) => {
    const form = new FormData();
    const stream = fs.createReadStream(__dirname + '/laptop_stock.jpeg');

    form.append('image', stream);

    // In Node.js environment you need to set boundary in the header field 'Content-Type' by calling method `getHeaders`
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
