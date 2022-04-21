const express = require('express');
const cors =require('cors');
const app = express();
const port = 4000;
require(dotenv).config();
const MYDNS = process.env.PUBLICDNS;
const indexRoute = require('./routes');

app.use(cors({
    origin: ["http://localhost:3000", MYDNS],
    credentials:true,
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRoute);


app.listen(port, () => {
    console.log(`Listening... ${port}port`);
})

module.exports = app;