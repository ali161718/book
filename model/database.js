const connection = require('./connection');

const database = {

    findWishlist: async (payload) => {

        const connDB = await connection();
        const db = connDB.db('storages');
        const collection = db.collection('wishlist');

        try {
            const recordSet = await collection.findOne(payload)

            
            if (!recordSet) {
                return 400;
            }

            return recordSet;

        } catch (error) {
            return 503;
        }

    },

    findsWishlist: async (payload) => {

        const connDB = await connection();
        const db = connDB.db('storages');
        const collection = db.collection('wishlist');

        try {
            const cursor = await collection.find(payload)
            // console.log(c);
            const recordSet = await cursor.toArray();

            if (!recordSet.length) return 400;

            return recordSet;

        } catch (error) {
            return 503;
        }

    },

    addWishlist: async (payload) => {

        const connDB = await connection();
        const db = connDB.db('storages');
        const collection = db.collection('wishlist');

        try {

            const findOne = await database.findWishlist(payload);

            if (findOne != 400) return 400;

            const recordSet = await collection.insertOne(payload)


            if (!recordSet.acknowledged) {
                return 503;
            }

            return 200;

        } catch (error) {
            return 503;
        }

    },

    deleteWishlist: async (payload) => {

        const connDB = await connection();
        const db = connDB.db('storages');
        const collection = db.collection('wishlist');

        try {
            const findOne = await database.findWishlist(payload);
            
            if (findOne == 400) return 400;

            const recordSet = await collection.deleteOne(payload)

            if (!recordSet.acknowledged) {
                return 400;
            }

            return 200;

        } catch (error) {
            return 503;
        }

    }

}

module.exports = database;