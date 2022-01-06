const { Model } = require('objection');
const fetch = require('cross-fetch');


class Movie extends Model {

    static tableName = 'movie';

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['api_movie_id', 'user_id'],

            properties: {
                id: { type: 'integer' },
                api_movie_id: { type: 'integer' },
                user_id: { type: 'integer' },
            }
        }
    };

    $beforeInsert() {
        this.added_at = new Date().toISOString();
    }
    
    /* Inserts the movie in the DB */
    static create = async (apiMovieId, userId) => {

        const existingFavoriteForUser = await Movie.query().where('api_movie_id', '=', apiMovieId).where('user_id', '=', userId);
        if (existingFavoriteForUser.length === 0) {
            const newMovie = await Movie.query().insert({
                api_movie_id: apiMovieId,
                user_id: userId,
            });
            return newMovie;
        } else {
            return undefined;
        }
    };

    /* Returns all favorite movies of the user with score and sorted*/
    static getAllFavorites = async (baseUrl, apiKey, userId) => {

        const favoriteMovies = await Movie.query().where('user_id', '=', userId);

        let detailedMoviesList = new Array();
        let sortedMovies = new Array();
        if (favoriteMovies.length > 0) {
            await Promise.all(favoriteMovies.map(async movie =>{
                let auxMovie = await Movie.getMovieFromApiById(baseUrl, apiKey, movie.api_movie_id);
                detailedMoviesList.push(auxMovie);
            }));

            const scoredMovies = Movie.generateUserScore(detailedMoviesList, 'favorite');
            sortedMovies = Movie.sortByScoreASC(scoredMovies, 'favorite');
        }
        return sortedMovies;
    };

    /*Fetches a single movie from themoviedb.org based on the ID provided */
    static getMovieFromApiById = async (baseURL, apiKey, movieId) => {

        let fetchURL = `${baseURL}/movie/${movieId}?api_key=${apiKey}`;
        try {
            const response = await fetch(fetchURL);
            const data = await response.json();
            return data;

        } catch (error) {
            return console.log(JSON.stringify(error));
        }
    }

    /* Fetches the data from themoviedb.org , if a keyword is provided, it fetches a list of movies that contains 
    the keyword , if not, a popular movies list is fetched */
    static getMoviesFromApi = async (baseURL, apiKey, keyword = undefined) => {

        let fetchURL = `${baseURL}/`;
        if (keyword) {
            fetchURL += `search/movie?api_key=${apiKey}&query=${keyword}&page=1`;
        } else {
            fetchURL += `movie/popular?api_key=${apiKey}&page=1`;
        }

        try {
            const response = await fetch(fetchURL);
            const data = await response.json();
            const scoredMovies = Movie.generateUserScore(data.results);
            const sortedMovies = Movie.sortByScoreASC(scoredMovies);
            return sortedMovies;

        } catch (error) {
            return console.log(JSON.stringify(error));
        }

    };

    /* Generates a random score between 0 and 99 for the movies  */
    static generateUserScore = (movies, type = '') => {

        movies.map((movie) => {
            let score = Math.floor(Math.random() * (99 - 0) + 0);
            if (type === 'favorite') {
                movie.suggestionForTodayScore = score;
            } else {
                movie.suggestionScore = score;
            }
        });
        return movies;
    };

    /* Sorts the movie list by ascending score*/
    static sortByScoreASC = (movies, type = '') => {

        if (type === 'favorite') {
            return movies.sort(function (a, b) { return b.suggestionForTodayScore - a.suggestionForTodayScore });
        } else {
            return movies.sort(function (a, b) { return b.suggestionScore - a.suggestionScore });
        }
    };

};

module.exports = Movie;