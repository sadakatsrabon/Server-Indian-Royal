const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middlewar 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcom to Indian Royal');
});

app.listen(port, () => {
    console.log(`Indian Royal Resturent's server is running on port ${port}`);
});