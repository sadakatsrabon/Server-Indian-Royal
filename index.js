const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middlewar 
app.use(cors());
app.use(express.json());

// Connect with MongoDB.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@s-cluster0.pvehgyn.mongodb.net/?retryWrites=true&w=majority`;

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

        // Data from MongoDB
        const menuData = client.db("indianRoyalDB").collection("menu");
        const reviewData = client.db("indianRoyalDB").collection("reviews");
        const cartCollection = client.db("indianRoyalDB").collection("carts");

        // Load Menu Data
        app.get('/menu', async (req, res) => {
            const result = await menuData.find().toArray();
            res.send(result);
        });

        // Load Reviews/Testemonials Data
        app.get('/reviews', async (req, res) => {
            const result = await reviewData.find().toArray();
            res.send(result);
        });


        // Cart Collection API
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                res.send([]);
            }
            const query = { email: email };
            const result = await cartCollection.find(query).toArray();
            res.send(result);
        })
        // Post Carts Collection    
        app.post('/carts', async (req, res) => {
            const item = req.body;
            console.log(item);
            const result = await cartCollection.insertOne(item);
            res.send(result);
        });


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// Get response from backend
app.get('/', (req, res) => {
    res.send('Welcom to Indian Royal');
});

// Listening confirmation
app.listen(port, () => {
    console.log(`Indian Royal Resturent's server is running on port ${port}`);
});