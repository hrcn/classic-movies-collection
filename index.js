const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require('./config/key');

const { User } = require('./models/user');
const user = require("./models/user");

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.error(err);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({"Hello!": "Hi!"});
})

// postman testing
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body); // create a new user model
  // save the user model
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ 
      success: true,
      userData: doc
    });
  }); 
})

app.post('/api/user/login', (req, res) => {
  // check the email address
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({
      loginSuccess: false,
      message: "Email entered not found."
    })
  })

  // compare the password
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch) return res.json({
      loginSuccess: false,
      message: "Wrong password."
    })
  })

  // generate token
  user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);
    res.cookie("x_auth", user.token)
      .status(200)
      .json({
        loginSuccess: true
      })
  })
})

app.listen(5000);