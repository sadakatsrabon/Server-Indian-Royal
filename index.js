const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Middle ware
app.use(cors());
app.use(express.json());

// MongoDB Connection 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@s-cluster0.pvehgyn.mongodb.net/?retryWrites=true&w=majority&appName=S-Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Databse
        return client.db("indianRoyalDB").collection('menu');
    }
    catch (error) {
        console.log("Sorry for a uncaught error ;", error);
        throw error;
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send(`String to check from port ${port}`);
});


// Listen Code
app.listen(port, () => {
    console.log(port);
}).on('error', (error) => {
    console.log(error);
})