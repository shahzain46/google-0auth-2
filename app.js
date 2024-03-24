const express = require('express');
const app = express();
const auth = require('./auth');
const session = require('express-session')

const passport = require('passport')
require('passport');


app.use(session({secret:'cats'}));
app.use(passport.initialize())
app.use(passport.session())


function isLoggedIn(req,res,next) {
    req.user ? next() : res.sendStatus(401)
}


app.get('/' , (req,res) => {
    res.send('<a href="/auth/google">auth with google </a>')
})

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email','profile']})
)

app.get('/google/callback', passport.authenticate('google',{
    successRedirect: '/protected',
    failureRedirect: '/auth/failur'
})
)

app.get('/protected', isLoggedIn ,(req,res)=>{
    res.send('redirected to home screen')
})

app.get('/auth/failur',(req,res)=>{
    res.send('something wents wrong....')
})


app.listen(3000, () => {
    console.log('server is listening to port 3000')
})