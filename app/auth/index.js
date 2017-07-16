const passport = require ('passport');
const config = require('../config');
const FacebookStratergy = require ('passport-facebook').Strategy();
const TwitterStratergy = require ('passport-twitter').Strategy();
const h =  require('../helper')
module.exports = ()=>{
    passport.serializeUser((user, done)=>{
  done(null, user.id)
    })
    let authrpocessor= (accessToken , refreshToken, profile, done)=>{
        h.findOne(profile.id).then(result=>{
            if(result)
                {
                done(null, result);
                }
            else{
              h.createNewUser(profile)
              .then(createNewUser=>done(null)).catch(Error=>{
                  console.log(Error)
              })
            }
               
        })
    }
    passport.use(new FacebookStratergy(config.fb,authrpocessor))
    passport.use(new TwitterStratergy(config.twitter, authrpocessor))
}