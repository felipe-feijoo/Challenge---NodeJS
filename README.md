# CHALLENGE NODE JS

This is the solution I came up with for the node.js challenge of Código del Sur.
It's an API that allows user registration , login, fetch a list with popular movies provided by https://www.themoviedb.org/
save user's favorite movies and retrieve them.

I used sqlite3 for the DB and objection.js as the ORM.

# Endpoints

## User related

### /user/sign-in
Allows the user to sign-in , in the request body you must provide email, firstName , lastName (can be empty), and password.

### /user/login
The request body must have email and password.

## Movie related

### /movie/get-list/:keyword?
Returns a list with popular movies, you can provide a url param named "keyword" to search for movies that include that keyword.

### /movie/get-favorites
It returns the list of the user favorite movies, you must provide the url param named userId

### /movie/add-favorite
POST method that allows the user to save a movie as a favorite, the request body must have  user_id, api_movie_id (the id wich identificates the movie in the moviedb.org), original_title (the movie title) and overview.



