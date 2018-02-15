var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
// var url = "mongodb://localhost:27017/";
var url = "mongodb://user_heroku_training:user_heroku_training@ds229878.mlab.com:29878/heroku_0vff4c09";
var async = require('asyncawait/async');
var await = require('asyncawait/await');

function getProducts() {
    var db = await(MongoClient.connect(url)); 
    var dbase = db.db("heroku_0vff4c09");
    var Products = await(dbase.collection("products").find({}).toArray());
    db.close();
    return Products;
}

function getProduct(id) {
    var db = await(MongoClient.connect(url)); 
    var dbase = db.db("heroku_0vff4c09");
    var Product = await(dbase.collection("products").findOne({_id: new ObjectId(id)}));
    db.close();
    return Product;
}

function deleteProduct(id) {
    var db = await(MongoClient.connect(url)); 
    var dbase = db.db("heroku_0vff4c09");
    var Product = await(dbase.collection("products").deleteOne({_id: new ObjectId(id)}));
    db.close();
    return Product;
}

function updateProduct(Product) {
    var db = await(MongoClient.connect(url)); 
    var dbase = db.db("heroku_0vff4c09");
    var id = Product._id;
    delete Product._id; // no se puede enviar el ID de nuevo porque da un error de que _id es inmutable
    var Product = await(dbase.collection("products").replaceOne({_id: new ObjectId(id)}, Product, {upsert: true}));
    db.close();
    return Product;
}

function addProduct(Product) {
    var db = await(MongoClient.connect(url)); 
    var dbase = db.db("heroku_0vff4c09");
    var Product = await(dbase.collection("products").insertOne(Product));
    db.close();
    return Product;
}

module.exports = {
    getProducts: async(getProducts),
    getProduct: async(getProduct),
    deleteProduct: async(deleteProduct),
    updateProduct: async(updateProduct),
    addProduct: async(addProduct)
};