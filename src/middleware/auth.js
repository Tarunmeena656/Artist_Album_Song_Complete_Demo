const passport = require("passport");
const secretKey = "Tarun@123";
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const artistModel = require("../models/artistModel");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const createError = require("http-errors");


//check login and give token to user
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const artist = await artistModel.findOne({ email });
        if (!artist) throw createError.Unauthorized("Invalid email");
        const validatePassword = await artist.isValidate(password);
        if (!validatePassword) throw createError.Unauthorized("Invalid");
        const payload = { _id: artist._id, email: artist.email ,role:artist.role};
        const token = jwt.sign(payload, secretKey,{expiresIn:'2h'});
        return done(null, {token});
      } catch (error) {
        done(error);
      }
    }
  )
);


// verify a token     
passport.use('jwt',new JWTstrategy(
    {
      secretOrKey : secretKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async(token ,done)=>{
      try {
        const{_id} = token;
        const artist = await artistModel.findById(_id);
        if(_id !== artist.id) throw createError.Unauthorized("Invalid artist");
        return done(null,artist);
      } catch (error) {
        done(error)
        
      }
    }
  ))



  //check role 
function hasRole(roles) {

    return function (req, res, next) {
        if (roles.includes(req.user.role)) {
            return next();
        } else {
            return next(new Error('You don\'t have sufficient access to this route.'));
        }
    }
}

module.exports = hasRole
