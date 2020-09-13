const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');
const { auth } = require('../middleware/auth');

router.post('/favoriteNumber', auth, (req, res) => {
  // find favorite information inside Favorite Collection by movie ID
  Favorite.find({"movieId": req.body.movieId})
    .exec((err, favorite) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({success: true, favoriteNumber: favorite.length})
    })
});

router.post('/favorited', auth, (req, res) => {
  // find favorite information inside Favorite Collection by movie ID & userFrom
  Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, favorite) => {
      if(err) return res.status(400).send(err)
      // already favorite a movie or not?
      let result = false;
      if (favorite.length !== 0) {
        result = true;
      }
      res.status(200).json({success: true, favorite: result})
    })
});

module.exports = router;
