const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Middle ware
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send(`String to check from port ${port}`);
});

// Listen Code
app.listen(port, () => {
    console.log(port);
}).on('error', (error) => {
    console.log(error);
})