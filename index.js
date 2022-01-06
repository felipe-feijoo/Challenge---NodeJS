const express = require('express');
const bodyParser = require('body-parser');

//Objection & knex
const knex = require('./src/util/database');
const { Model } = require('objection');

//DB INIT
const databaseInitArchive = require('./src/util/databaseInit');
const db = databaseInitArchive.db;

//db.run('DROP TABLE movie');

databaseInitArchive.dbCreateUsersTable(db);
databaseInitArchive.dbCreateFavoritesMoviesTable(db);


Model.knex(knex);
const app = express();

//Routes
const usersRoutes = require('./src/routes/UserRoutes');
const moviesRoutes = require('./src/routes/MovieRoutes');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS,GET,POST,PUT,PATCH,DELETE'
    );
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

//Routes

//POST user/sign-in  | POST user/login 
app.use('/user', usersRoutes);

//GET movie/get-list/:keyword? |GET movie/get-favorites | POST movie/add-favorite
app.use('/movie', moviesRoutes);


//Server listening
app.listen(8080);





