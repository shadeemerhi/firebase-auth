const express = require('express');
require("dotenv").config();
const app = express();
const cors = require("cors");
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

var admin = require("firebase-admin");

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// This resets on all server saves
const users = {};

// Express configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

app.use(cors({ origin: true, credentials: true }));


// Sample GET route
app.get('/api/data', (req, res) => {
  const idToken = req.query.token;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      console.log('user ID: ', decodedToken.uid);
      console.log('users', users);
      setTimeout(() => {
        res.send(users[decodedToken.uid]);
      }, 1200);
    })
    .catch(error => {
      res.send('UNAUTHORIZED REQUEST');
    });
});

app.post('/api/users', (req, res) => {
  const user = req.body.user;
  users[user.uid] = user.email;
  console.log('users', users);
  res.send('Thanks for the new user!');
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
