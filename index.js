const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://hrcn:hanrui1996@cluster0.cua0b.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.error(err);
})

app.get('/', (req, res) => {
  res.send("Hello!");
})

app.listen(5000);