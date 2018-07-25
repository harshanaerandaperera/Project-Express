const express = require('express');
const router = express.Router();  //handle all requests by express router
const jwt = require('jsonwebtoken');        //import jsonwebtoken for create tokens,  refer doc https://www.npmjs.com/package/jsonwebtoken
const config = require('../config/database');
const passport = require('passport');
const bcrypt = require('bcryptjs'); //encrypt # passwords
const User = require('../models/user');   //we must import the model to insert data//


/*
 *Functions ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

/**
 * @param newUser as user object
 * @param callback return as (err, res)
 */
saveUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {                         //check this bcrypt function in the doc(bcryptjs) under "To hash a password"
        bcrypt.hash(newUser.password, salt, (err, hash) => {        //pass the newUser.password to bcrypt.hash to hash the currentUser password
            // console.log(hash);        //print the converted hash password
            newUser.password = hash;
            //console.log(err);
            if (err){
                console.log("Save User function  Error: "+err)
            }
            else {
                newUser.save(callback);         //save the currentUser and give a callback
            }
        });
    });
};


/**compare plainPassword and hash
 * @param plainPassword
 * @param hash
 * @param callback return as (err, res)
 */
passwordCheck = (plainPassword, hash, callback) => {       //hash password comes from the db and check with the plainPassword entered by the currentUser

    bcrypt.compare(plainPassword, hash, (err, res) => {         //compare plain password with hash & check this bcrypt function in the doc(bcryptjs) under "To check a password"   & here res data type is boolean

        if (err)
        {
            console.log("password check error " + err);
        }
        if (res)
        {
            // console.log(res); //print true if password matched  |  res is true if password matched
            callback(null, res);
        }
        else
        {   //res is false if password not matched
            callback(null, res)
        }
    });
};


/**
 * @param callback as all users in the db
 */
getAllUsers= callback => {
    User.find(callback);
};


/**
 * @param id
 * @param callback
 */
getUserByID = (id, callback) => {
    const query = {_id: id};
    User.findOne(query, callback);
};


/**
 * @param email as req
 * @param callback as (err, currentUser)
 * return available currentUser
 */
getUserByEmail = (email, callback) => {
    const query = {email: email};
    User.findOne(query, callback);          //select * from currentUser where email= "your email here"
};


/**
 * @param id
 * @param update field that want to update
 * @param callback
 */
updateUserById = (id, update, callback) => {
    const query = {_id: id};
    User.findOneAndUpdate(query,{$set:update}, callback);
};

/**
 * @param email
 * @param update
 * @param callback
 */
updateUserByEmail = (email, update, callback) => {
    const query = {email: email};           //when writing a query we must define left side variable same as the field in the model
    User.findOneAndUpdate(query,{$set:update}, callback);
};


/**
 * @param id as input
 * @param callback as deleted user and err
 */
deleteUserByID = (id, callback) => {
    const query = {_id: id};
    User.findOneAndRemove(query,callback);
};

/**
 * @param email as input
 * @param callback as deleted user and err
 */
deleteUserByEmail=(email,callback)=>{
    const query = {email: email};
    User.findOneAndRemove(query,callback);
};




/*
 * Routes ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

router.get("", (req, res) => {          //blank url means the root page(localhost:3000/user)
    res.send("Testing localhost:3000/currentUser Respond");
});

router.post("/register", (req, res) => {        //this url means http://localhost:3000/user/register  ,    req means the request,here request is localhost:3000/currentUser/register
     //  console.log(req.body);  //works only if body-parser import to app.js
    const newUser = new User({              //request body save as an new User object(here new object is the User) here User is from Model
        username: req.body.username,
        name: req.body.name,            //get name from request body
        email: req.body.email,
        password: req.body.password,
        role:req.body.role,
        projectCount: req.body.projectCount
    });

    saveUser(newUser, (err, user) => {

        if (err) {
            // console.log(err);
            res.json({state: false, msg: "User not inserted from saveUser"});
        }
        if (user) {
            //  console.log(currentUser);
            res.json({state: true, msg: "User inserted from saveUser"});
        }

    });
});



router.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    //find the currentUser by  email in db
    getUserByEmail(email, (err, user) => {

        //if (err) throw err;
        if (err) {
            console.log("getUserByEmail Function Error: " + err);
        }

        if (!user) {
            //if currentUser is not available in db then send json response that "No currentUser found"
            res.json({state: false, msg: "No User found"});
        }

        if (user) {
            //here password is the currentUser entered password(from front end) and currentUser.password is from database then compare
            passwordCheck(password, user.password, (err, match) =>
            {
                if (match)
                {
                    //if password matched then create a token using jsonwebtoken & that token will expires in 1 hour
                    const token = jwt.sign({user: user}, config.secret, {expiresIn: 3600});

                    //must give the Bearer prefix
                    res.json({state:true,token: "Bearer "+token});
                }
                else
                {
                    res.json({state: false, msg: "password doesn't match"});
                }
            });
        }
    });
});



//  return current currentUser from the token by give Bearer token as Authorization header
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {  //Authenticate requests by passport and proceed
    res.json(req.user);
    }
);

router.get('/showallusers', (req, res) => {
    getAllUsers((err,Users) => {
        if (err) {
            console.log("getAllUsers Function Error: " + err);
        }
        else {
            res.json(Users);
        }
    });
});


/**
 * @param ObjectId as req
 * @return user as json respond
 */
    router.post('/finduserbyid', (req, res) => {
    getUserByID(req.body.id, (err, user) => {
        if (err) {
            console.log("getUser Function Error: " + err);
        }
        else {
            res.json(user);
        }
    });
});

router.post('/finduserbyemail', (req, res) => {
    getUserByEmail(req.body.email, (err, user) => {
        if (err) {
            console.log("getUserByEmail Function Error: " + err);
        }
        else {
            res.json(user);
        }
    });
});



router.put('/updateprojectcountbyid', (req, res) => {
    const update = {
        projectCount: req.body.projectCount,
    };
    updateUserById(req.body.id, update, (err, updatedUser) => {
        if (err) {
            console.log("updateUserById Function Error: " + err);
        }
        else {
            res.json({state: true,updatedUser, msg: 'User Updated Successfully'});
        }
    });
});

router.put('/updateprojectcountbyemail', (req, res) => {
    const update = {
        projectCount: req.body.projectCount,
    };
    updateUserByEmail(req.body.email, update, (err, updatedUser) => {
        if (err) {
            console.log("updateUserByEmail Function Error: " + err);
        }
        else {
            res.json({state: true,updatedUser, msg: 'User Updated Successfully'});
        }
    });
});

router.put('/updateprofile', (req, res) => {
    const update = {
        name: req.body.name,
        skills:req.body.skills
    };
    updateUserByEmail(req.body.email, update, (err, updatedUser) => {
        if (err) {
            console.log("updateUserByEmail Function Error: " + err);
        }
        else {
            res.json({state: true,updatedUser, msg: 'User Updated Successfully'});
        }
    });
});


router.delete('/deleteuserbyid', (req, res) => {
    deleteUserByID(req.body.id, (err, deletedUser) => {
        if (err) {
            console.log("deleteUserByID Function Error: " + err);
        }
        else {
            res.json({state: true,deletedUser, msg: 'User Deleted Successfully'});
        }
    });
});


router.delete('/deleteuserbyemail/:email', (req, res) => {
    deleteUserByEmail(req.params.email, (err, deletedUser) => {
        if (err) {
            console.log("deleteUserByEmail Function Error: " + err);
        }
        else {
            res.json({state: true,deletedUser, msg: 'User Deleted Successfully'});
        }
    });
});




module.exports = router;