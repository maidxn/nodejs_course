const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const https = require('https')
const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')

const { Strategy } = require('passport-google-oauth20')

require('dotenv').config()

const PORT = 520

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done){
    console.log('Google profile', profile)
    done(null, profile)
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    // user.findById(id).then(user => {
    //     done(null, user)
    // })
    done(null, id)
})

const app = express()

app.use(helmet())

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]
}))

app.use(passport.initialize())
app.use(passport.session())

function checkLoggedIn(req, res, next){
    console.log(req.user, ' is trying to access!')
    const isLoggedIn = req.isAuthenticated() && req.user
    if (!isLoggedIn){
        return res.status(401).json({
            error: ':P Log in first'
        })
    }
    next()
}

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email']
    }))

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/', 
}), 
(req, res)=> {
    console.log('Auth done')
})

app.get('/auth/logout', (req, res) => {
    req.logout()
    return res.redirect('/')
})

app.get('/failure', (req, res) => {
    return res.send('他不喜欢你啊')
})


app.get('/secret', checkLoggedIn, (req, res) => {
    return res.send('Crush is the sunnnnnnnnnn')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {
    console.log(`NAW WAN ${PORT}`)
})