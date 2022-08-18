const { MongoClient } = require('mongodb');
require('dotenv').config();

const database = async _ => {
    try {
        
        const client = new MongoClient(process.env.mongodb);
        const connection = await client.connect();

        return connection;

    } catch (error) {
        return error;
    }
}

module.exports = database;