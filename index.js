const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

/**
 * Middleware functions
 */
app.use(cors());
app.use(express.json());


/**
 * Database Connection
 */
const uri = "mongodb+srv://dbuser1:9P2AGUUElq70TuhK@cluster0.juclx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("myDBStore");
        const radioStationCollection = database.collection("radio_station");

        app.get('/station', async (req, res) => {
            const result = await radioStationCollection.find({}).toArray();
            res.json(result);
        });

        console.log('Successfully database connected');
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log('Listening at', port);
})