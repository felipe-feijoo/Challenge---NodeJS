const { Model } = require('objection');
const fetch = require('cross-fetch');


class Movie extends Model {

    static tableName = 'movie';

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['api_movie_id', 'user_id', 'original_title'],

            properties: {
                id: { type: 'integer' },
                api_movie_id: { type: 'integer' },
                user_id: { type: 'integer' },
                original_title: { type: 'string', minLength: 1 },
                deleted: { type: 'boolean' },
            }
        }
    };

    $beforeInsert() {
        this.added_at = new Date().toISOString();
    }
    /* Inserts the movie in the DB */
    static create = async (apiMovieId, userId, movieTitle, movieOverview) => {

        const existingFavoriteForUser = await Movie.query().where('api_movie_id', '=', apiMovieId).where('user_id', '=', userId);

        if (!existingFavoriteForUser) {
            const newMovie = await Movie.query().insert({
                api_movie_id: apiMovieId,
                user_id: userId,
                original_title: movieTitle,
                overview: movieOverview,
                deleted: false
            });

            return newMovie;
        } else {
            return undefined;
        }


    };
    /* Returns all favorite movies of the user with score and sorted*/
    static getAllFavorites = async (userId) => {

        const favoriteMovies = await Movie.query().where('user_id', '=', userId);
        const scoredMovies = Movie.generateUserScore(favoriteMovies, 'favorite');
        const sortedMovies = Movie.sortByScoreASC(scoredMovies, 'favorite');

        return sortedMovies;
    };
    /* Fetches the data from themoviedb.org , if a keyword is provided, it fetches a list of movies that contains 
    the keyword , if not, a popular movies list is fetched */
    static getMoviesFromAPI = async (baseURL, apiKey, keyword = undefined) => {

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