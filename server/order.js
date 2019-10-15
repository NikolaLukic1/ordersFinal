const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get order
router.get('/', async (req,res) => {
    const data = await loadOrderCollection();
    res.socket.setNoDelay();
    res.send(await data.find({}).toArray());
});

//insert order
router.post('/', async(req,res) => {
    const data = await loadOrderCollection();
    
    await data.insertOne(
        req.body
    );
    res.status(201).send();
});

/*
//edit partner
router.put("/", async (req,res) => {
    const data = await loadPartnersCollection();
    let querry = {_id: new mongodb.ObjectID(req.body.id)}

    let updateObj = { $set :{  
        localId: req.body.updates.localId,
        name: req.body.updates.name,
        active: req.body.updates.active
    }}
        
    data.updateOne(querry, updateObj, function(err, res) {
        if (err) throw err;
        });
        
    res.status(200).send();
});*/

//delete partner
router.delete('/:id', async(req,res) => {
    const data = await loadOrderCollection();
    await data.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadOrderCollection() {
    //'mongodb://localhost/podaci'
    //'mongodb+srv://nikola:Thenikgame93@cluster0-b924k.mongodb.net/test?retryWrites=true&w=majority'

    const uri = 'mongodb+srv://rajovicmirko:Mirkasin.12345@cluster0-folf1.mongodb.net/admin?retryWrites=true&w=majority'
    const dbName = 'orders'
    const collection = 'order'

    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const data = client.db(dbName).collection(collection);

    return data;
}
module.exports = router;
