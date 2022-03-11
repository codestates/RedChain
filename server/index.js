const express = require('express');
const cors =require('cors');
const app = express();
const port = 4000;

const indexRoute = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/', indexRoute);


app.listen(port, () => {
    console.log("Listening... 4000port");
})

module.exports = app;