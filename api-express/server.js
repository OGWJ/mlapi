const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
app.use(fileupload());

app.post('/', (req, res) => {
    // console.log(req.files);
    res.sendStatus(200);
})

app.listen(4000);