const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require('./models/user');

mongoose.connect('mongodb+srv://hrcn:hanrui1996@cluster0.cua0b.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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

    return res.status(200).json({ success: true });
  }); 
})

app.listen(5000);