const express = require('express');

const router = express.Router();
const { Favorite } = require('../models/Favorite');
const { auth } = require('../middleware/auth');

router.post('/favoriteNumber', auth, (req, res) => {
  // find favorite information inside Favorite Collection by movie ID
  Favorite.find({ movieId: req.body.movieId })
    .exec((err, favorite) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, favoriteNumber: favorite.length });
    });
});

router.post('/favorited', auth, (req, res) => {
  // find favorite information inside Favorite Collection by movie ID & userFrom
  Favorite.find({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, favorite) => {
      if (err) return res.status(400).send(err);
      // already favorite a movie or not?
      let result = false;
      if (favorite.length !== 0) {
        result = true;
      }
      res.status(200).json({ success: true, favorite: result });
    });
});

router.post('/addToFavorite', auth, (req, res) => {
  // save the info about movie and user ID
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/removeFromFavorite', auth, (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, doc });
    });
});

router.post('/getFavoritedMovie', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom })
    .exec((err, favorites) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, favorites });
    });
});

module.exports = router;
