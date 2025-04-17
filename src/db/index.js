const mongoose = require('mongoose');

const uri = "mongodb+srv://user:demo2930@cluster0.qvrif.mongodb.net/realstate?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas ✅"))
    .catch(e => console.error("Connection error ❌", e.message));

const db = mongoose.connection;

module.exports = db;
