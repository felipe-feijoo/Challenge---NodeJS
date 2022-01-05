const { Model } = require('objection');
const bcrypt = require('bcrypt');


class User extends Model {

    static tableName = 'user';

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'first_name', 'password'],

            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1 },
                first_name: { type: 'string', minLength: 1 },
                password: { type: 'string', minLength: 1 },
            }
        }
    };
    /* Inserts the user in the DB */
    static create = async (email, firstName, lastName, password) => {
        password = await bcrypt.hash(password, 12);
        const newUser = await this.query().insert({
            email,
            first_name: firstName,
            last_name: lastName,
            password,
        });

        return newUser;
    };
    /* Search for the user in the DB, if the user is not found, it returns undefined */
    static findUserByEmail = async (userEmail) => {
        let existingUser = await User.query().findOne({
            email: userEmail,
        });
        return existingUser;
    };


    /* Validates the inputs for user related actions, the email is the only mandatory parameter*/
    static validateUser = (email, firstName = '', password = '') => {
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = true;
        let validFirstName = true;
        let validPassword = true;
        let valid = false;
        let validationMessage = '';

        if (email.trim().length <= 0) {
            validEmail = false;
            validationMessage += 'The email field cannot be empty || ';
        }

        if (!emailRegex.test(email)) {
            validEmail = false;
            validationMessage += 'You must enter a valid email format: valid@format.com ||';
        }
        if (firstName != '') {
            if (firstName.trim().length <= 0) {
                validFirstName = false;
                validationMessage += 'The first name field cannot be empty ||';
            }
        }

        if (password != '') {
            if (password.trim().length <= 0) {
                validPassword = false;
                validationMessage += '|| The password field cannot be empty ';
            }
        }

        if (validEmail && validFirstName && validPassword) {
            valid = true;
        }

        return { valid, validationMessage };
    };
}

module.exports = User;






