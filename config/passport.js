//This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
//when we send a request , we can use passport-jwt for identify logged users or not logged users
//below code explains the check Authorization token
// refer https://www.npmjs.com/package/passport-jwt -> An example configuration which reads the JWT from the http Authorization header with the scheme 'bearer'

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./database');
const User = require('../models/user');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
       findUserById({_id: jwt_payload.user._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};

findUserById = (id, callback) => {
    User.findOne(id, callback);
};
