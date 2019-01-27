const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken') 
const randtoken = require('rand-token') 

const refreshTokens = {} 
const SECRET = "SECRETO_PARA_ENCRIPTACION" 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.post('/login', function (req, res, next) { 
  const username = req.body.username 
  const password = req.body.password
  const user = { 
    'username': username, 
    'role': 'admin' 
  } 
  const token = jwt.sign(user, SECRET, { expiresIn: 300 }) 
  const refreshToken = randtoken.uid(256) 
  refreshTokens[refreshToken] = username
  res.json({token: 'JWT ' + token, refreshToken: refreshToken}) 
});

app.post('/token', function (req, res, next) {
  const username = req.body.username
  const refreshToken = req.body.refreshToken
  if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
    const user = {
      'username': username,
      'role': 'admin'
    }
    const token = jwt.sign(user, SECRET, { expiresIn: 300 })
    res.json({token: 'JWT ' + token})
  }
  else {
    res.send(401)
  }
})

app.listen(3000,()=>console.log('running on 3000'))