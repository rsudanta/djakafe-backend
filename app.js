require('dotenv').config({ path: './.env' })
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const routes = require('./routes/route');
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api',routes);
// const port = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => {
    console.log(`Run`);
});