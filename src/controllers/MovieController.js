const Movie = require('../models/Movie');

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = '6914ac9f3c71e25f06891a8e2dbfdda8';

//GET   
exports.listMovies = async (req, res, next) => {
    const keyword = req.param('keyword');
    try {
        const movies = await Movie.getMoviesFromAPI(baseURL, apiKey, keyword);

        return res.status(200).json({ movies: movies });
    } catch (error) {
        return res.status(500).json({ message: 'Error while trying to get the movies list', error: JSON.stringify(error) });
    }
};
//GET  
exports.listFavoriteMovies = async (req, res, next) => {
    const userId = req.param('userId');
    if (!userId) {
        return res.status(400).json({ message: 'You must provide your user Id' });
    }

    try {
        const favoriteList = await Movie.getAllFavorites(userId);

        return res.status(200).json({ favoriteMovies: favoriteList });
    } catch (error) {
        return res.status(500).json({ message: 'Error while trying to get the favorites list', error: error });
    }
};
//POST  
exports.addToFavorites = async (req, res, next) => {

    const body = req.body;

    const apiMovieId = body.api_movie_id;
    const userId = body.user_id;
    const title = body.original_title;
    const overview = body.overview;

    if (!apiMovieId || !userId || !title || !overview) {
        return res.status(400).json({ message: 'One or more of the parameters required are missing' });
    }

    try {
        const newFavoriteMovie = await Movie.create(apiMovieId, userId, title, overview);
        if(newFavoriteMovie !=undefined){

            return res.status(201).json({ message: 'Movie succesfully added to favorites', newFavorite: newFavoriteMovie });
        }else{
            return res.status(400).json({ message: 'The movie is already in user favorites list'});
        }
    } catch (error) {

        return res.status(500).json({ message: 'Error while trying to add the movie to favorites list', error: error });
    }
};