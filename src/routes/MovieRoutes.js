const express = require('express');
const movieController = require('../controllers/MovieController');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/get-list/:keyword?', isAuth, movieController.listMovies);
router.get('/get-favorites', isAuth, movieController.listFavoriteMovies);
router.post('/add-favorite', isAuth, movieController.addToFavorites);

module.exports = router;