const mongoose = require('mongoose');   //to define schema we have to import mongoose , see the doc
const schema = mongoose.Schema;   //schema means a document in mongodb


const userSchema = new schema({     //define currentUser collection fields(like create table in sql) //create table currentUser

    username: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String},
    projectCount: {type: Number},
    skills:[String],
});

module.exports = mongoose.model("User", userSchema);   //export the model(userSchema) as User
