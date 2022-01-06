# CHALLENGE NODE JS

This is the solution I came up with for the node.js challenge of Código del Sur.
It's an API that allows user registration , login, fetch a list with popular movies provided by https://www.themoviedb.org/
save user's favorite movies and retrieve them.

I used sqlite3 for the DB and objection.js as the ORM.

The server listens on port 8080.

For the movies related endpoints, a token must be provided, it is implemented as a Jason Web Token and needs to be included in the Authorization header
using the Bearer schema, for example :  Headers  {Authorization: Bearer <<token>> }.

# Endpoints

## User related

### POST | /user/sign-in  - Parameters (email,firstName,lastName,password)
Allows the user to sign-in , in the request body you must provide email, firstName , lastName (can be empty), and password.
It has simple input validation.

Request example:
{
    "email": "123@prueba.com",
    "firstName": "Prueba",
    "lastName": "", 
    "password": "********"
}

The response looks like this:
{
    "message": "User created succesfully",
    "newUser": "123@prueba.com"
}


### POST | /user/login - Parameters (email,password)
The request body must have email and password, here's an example:
{
    "email": "123@prueba.com",
    "password": "*******"
}


The response looks like this:

{
    "message": "Login succesful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BwcnVlYmEuY29tIiwidXNlcklkIjo1LCJpYXQiOjE2NDE0ODc4ODYsImV4cCI6MTY0MTQ5MTQ4Nn0.JFvzQgnX6ph1RhtWJ9bUy-QpktvPyhQoAM9AfzdQ1Uo"
}

The token must be included in all the Movie related requests.


## Movie related
All the endpoints below require an authorization token.

### GET | /movie/get-list/:keyword?
Returns a list with popular movies, you can provide a url param named "keyword" to search for movies that include that keyword.

Request url (with keyword) : localhost:8080/movie/get-list

Response example(without keyword):

{
    "movies": [
        {
            "adult": false,
            "backdrop_path": "/tutaKitJJIaqZPyMz7rxrhb4Yxm.jpg",
            "genre_ids": [
                16,
                35,
                10751,
                10402
            ],
            "id": 438695,
            "original_language": "en",
            "original_title": "Sing 2",
            "overview": "Buster and his new cast now have their sights set on debuting a new show at the Crystal Tower Theater in glamorous Redshore City. But with no connections, he and his singers must sneak into the Crystal Entertainment offices, run by the ruthless wolf mogul Jimmy Crystal, where the gang pitches the ridiculous idea of casting the lion rock legend Clay Calloway in their show. Buster must embark on a quest to find the now-isolated Clay and persuade him to return to the stage.",
            "popularity": 1762.717,
            "poster_path": "/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg",
            "release_date": "2021-12-01",
            "title": "Sing 2",
            "video": false,
            "vote_average": 7.6,
            "vote_count": 137,
            "suggestionScore": 97
        },
        {
            "adult": false,
            "backdrop_path": "/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg",
            "genre_ids": [
                28,
                12,
                878
            ],
            "id": 634649,
            "original_language": "en",
            "original_title": "Spider-Man: No Way Home",
            "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
            "popularity": 8448.569,
            "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            "release_date": "2021-12-15",
            "title": "Spider-Man: No Way Home",
            "video": false,
            "vote_average": 8.4,
            "vote_count": 3510,
            "suggestionScore": 88
        },
    ]
}


Request url (with keyword) : localhost:8080/movie/get-list?keyword=venom

Response example (with keyword): 

{
    "movies": [
        {
            "adult": false,
            "backdrop_path": "/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg",
            "genre_ids": [
                878,
                28
            ],
            "id": 335983,
            "original_language": "en",
            "original_title": "Venom",
            "overview": "Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote. Soon, he must rely on his newfound powers to protect the world from a shadowy organization looking for a symbiote of their own.",
            "popularity": 339.933,
            "poster_path": "/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg",
            "release_date": "2018-09-28",
            "title": "Venom",
            "video": false,
            "vote_average": 6.9,
            "vote_count": 12643,
            "suggestionScore": 95
        },
        {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [
                53
            ],
            "id": 204973,
            "original_language": "en",
            "original_title": "Venom",
            "overview": "After a car breaks down in an isolated desert, a mother and young daughter are relentlessly pursued by a deadly snake",
            "popularity": 11.758,
            "poster_path": "/xooRYiNbZtwNUdx0p60QvWxuxeD.jpg",
            "release_date": "2011-07-15",
            "title": "Venom",
            "video": false,
            "vote_average": 5.8,
            "vote_count": 16,
            "suggestionScore": 81
        },
        {
            "adult": false,
            "backdrop_path": "/t6Ovw9kvfjcOKkknXcSNXtUIIly.jpg",
            "genre_ids": [
                14
            ],
            "id": 573336,
            "original_language": "en",
            "original_title": "Red Venom Kills",
            "overview": "Alluring young Scarlet Silk is a vengeful hooker gone crazy after her parents murder, and being stabbed several times. The audacious naughty teen changes her destiny near death by discovering a mysterious crate from the Amazon jungle left behind by her mother that has two mystical bottles of red venom; one that heals, and the other that poisons. Scarlet then transcends herself into becoming the deadliest predator in the jungle, as her mission is to inject her poisonous venom into the diabolical underworld queen Dark Widow.",
            "popularity": 5.425,
            "poster_path": "/jxtV9aqxBLWD55PUP7xv5Qu7uTL.jpg",
            "release_date": "2018-12-04",
            "title": "Red Venom Kills",
            "video": false,
            "vote_average": 3,
            "vote_count": 2,
            "suggestionScore": 78
        },
    ]
}    




### GET | /movie/get-favorites
It returns the list of the user favorite movies,sorted ASC by a new field called suggestionForTodayScore wich is a random number between 0 - 99.

The response look like this:
{
    "favoriteMovies": [
        {
            "adult": false,
            "backdrop_path": null,
            "belongs_to_collection": null,
            "budget": 0,
            "genres": [
                {
                    "id": 99,
                    "name": "Documentary"
                },
                {
                    "id": 10770,
                    "name": "TV Movie"
                }
            ],
            "homepage": "",
            "id": 823460,
            "imdb_id": null,
            "original_language": "en",
            "original_title": "Venom",
            "overview": "A BBC Earth documentary inside the world of the most venomous creatures on Earth, with stories from survivors of deadly venom attacks from animals coupled with 3D graphic technology that showcases the effects of venom on the human body.",
            "popularity": 4.802,
            "poster_path": "/jTA7RlUkroNhj0q0Tc22h6XqKBn.jpg",
            "production_companies": [
                {
                    "id": 3324,
                    "logo_path": "/dqT3yOTlfJRmtvk52Ccd1O6dZ0A.png",
                    "name": "BBC",
                    "origin_country": "GB"
                },
                {
                    "id": 6790,
                    "logo_path": "/A0TzRpnwLcUcNgrvDJ0BIajf56b.png",
                    "name": "Discovery Channel",
                    "origin_country": "US"
                }
            ],
            "production_countries": [],
            "release_date": "2015-08-04",
            "revenue": 0,
            "runtime": 52,
            "spoken_languages": [
                {
                    "english_name": "English",
                    "iso_639_1": "en",
                    "name": "English"
                }
            ],
            "status": "Released",
            "tagline": "See nature's chemical warfare in action!",
            "title": "Venom",
            "video": false,
            "vote_average": 10,
            "vote_count": 1,
            "suggestionForTodayScore": 69
        },
        {
            "adult": false,
            "backdrop_path": "/of1EpT8iYFfiF1b0Bo3PPHjyAzi.jpg",
            "belongs_to_collection": null,
            "budget": 35000000,
            "genres": [
                {
                    "id": 35,
                    "name": "Comedy"
                },
                {
                    "id": 10751,
                    "name": "Family"
                }
            ],
            "homepage": "http://disney.go.com/olddogs/",
            "id": 22949,
            "imdb_id": "tt0976238",
            "original_language": "en",
            "original_title": "Old Dogs",
            "overview": "Charlie and Dan have been best friends and business partners for thirty years; their Manhattan public relations firm is on the verge of a huge business deal with a Japanese company. With two weeks to sew up the contract, Dan gets a surprise: a woman he married on a drunken impulse nearly nine years before (annulled the next day) shows up to tell him he's the father of her twins, now seven, and she'll be in jail for 14 days for a political protest. Dan volunteers to keep the tykes, although he's up tight and clueless. With Charlie's help is there any way they can be dad and uncle, meet the kids' expectations, and still land the account?",
            "popularity": 31.081,
            "poster_path": "/kBGqhumfOuDCpIErICWPHcXNvah.jpg",
            "production_companies": [
                {
                    "id": 2,
                    "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
                    "name": "Walt Disney Pictures",
                    "origin_country": "US"
                },
                {
                    "id": 870,
                    "logo_path": null,
                    "name": "Tapestry Films",
                    "origin_country": "US"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ],
            "release_date": "2009-11-24",
            "revenue": 96753696,
            "runtime": 88,
            "spoken_languages": [
                {
                    "english_name": "English",
                    "iso_639_1": "en",
                    "name": "English"
                },
                {
                    "english_name": "Ukrainian",
                    "iso_639_1": "uk",
                    "name": "Український"
                }
            ],
            "status": "Released",
            "tagline": "Sit. Stay. Play Dad.",
            "title": "Old Dogs",
            "video": false,
            "vote_average": 5.5,
            "vote_count": 566,
            "suggestionForTodayScore": 24
        }
    ]
}

### POST | /movie/add-favorite  - Parameters (api_movie_id)  
POST method that allows the user to save a movie as a favorite, the request body must have the api_movie_id (the id wich identificates the movie in the moviedb.org).

Request example: 

{
    "api_movie_id": 22949
}

Response example:

{
    "message": "Movie succesfully added to favorites"
}

