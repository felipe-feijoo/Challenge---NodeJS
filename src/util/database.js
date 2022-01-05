const {Model} = require('objection');
const Knex = require('knex');
const config = require('../db/knexfile');

// Initialize knex.
const knex = Knex(config);

// Give the knex instance to objection.
Model.knex(knex);

module.exports = knex;
