const express = require('express');
const cors =require('cors');
const app = express();
const port = 4000;

const indexRoute = require('./routes');

app.use(cors({
    origin: "http://localhost:3000",
    creadentials:true,
    }));
app.use(express.json());
app.use('/', indexRoute);


app.listen(port, () => {
    console.log(`Listening... ${port}port`);
})

module.exports = app;