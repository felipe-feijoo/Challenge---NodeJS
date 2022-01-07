/*
    This file iscalled in index.js to create the tables user and movie.
*/
const sqlite3 = require("sqlite3").verbose();


exports.db = new sqlite3.Database('src/db/challenge.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
});
exports.dbCreateUsersTable = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT,
    password TEXT NOT NULL
    )`);
};
exports.dbCreateFavoritesMoviesTable = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS movie (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    api_movie_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    added_at TEXT
    )`);
};
