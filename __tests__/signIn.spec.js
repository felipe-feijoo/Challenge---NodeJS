const User = require('../src/models/User');
const Knex = require('knex');
//const { Model } = require('objection');
const knexConfig = require('../src/db/knexfile');
const knex = Knex(knexConfig);
User.knex(knex);

describe('Sign In functionality', () => {

    test("It should validate user inputs for creating a new user -SUCCESS", () => {
        const input = {
            email: "test123@test.com",
            firstName: "Test",
            lastName: "TestLastName",
            password: "testing-Pa$$word"
        };

        const output = {
            valid: true,
            validationMessage: ""
        };

        expect(User.validateUser(input.email, input.firstName, input.password)).toEqual(output);
    });

    test("It should  validate user inputs for creating a new user", () => {
        const input = {
            email: "test123@test.com",
            firstName: "Test",
            lastName: "TestLastName",
            password: ""
        };

        const output = {
            valid: false,
            validationMessage: "|| The password field cannot be empty "
        };

        expect(User.validateUser(input.email, input.firstName, input.password)).toEqual(output);
    });

    test("It should prevent an already registered user to sign-in - CASE : Already registered user", () => {
        const input = {
            email: "felipe@prueba.com"
        };

        expect(User.findUserByEmail(input.email)).resolves.not.toBe(undefined);
    });

    test("It should prevent an already registered user to sign-in - CASE : Not registered user", () => {
        const input = {
            email: "anotherTest@prueba.com",
        };

        expect(User.findUserByEmail(input.email)).resolves.toBe(undefined);;
    });
});

