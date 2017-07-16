const express = require('express');
const app = express();
const passport = require ('passport');
app.set('port', process.env.PORT||3000)
app.set('view engine', 'ejs'); 
app.use(express.static('public'))
const chatcat = require('./app');
app.use(chatcat.session);
app.use('/', chatcat.router);
app.use(passport.initialize());
app.use(passport.session());

app.listen(app.get('port'),()=>{
    console.log("chatcat running on: ", app.get('port'))
})