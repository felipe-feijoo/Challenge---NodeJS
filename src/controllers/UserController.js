const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST
exports.createUser = async (req, res, next) => {
    const body = req.body;

    const email = body.email;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const password = body.password;

    try {
        const validateUser = User.validateUser(email, firstName, password);

        if (validateUser.valid) {
            const existingUser = await User.findUserByEmail(email);

            if (existingUser === undefined) {
                const newUser = await User.create(email, firstName, lastName, password);
                return res.status(201).json({ message: 'User created succesfully', newUser: newUser });
            } else {
                return res.status(500).json({ message: 'User is already registered' });
            }
        } else {
            return res.status(400).json({ message: 'Please provide valid information', details: validateUser.validationMessage });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal error on creating', error: JSON.stringify(error) });
    }
};
//POST
exports.login = async (req, res, next) => {
    const body = req.body;

    const email = body.email;
    const password = body.password;

    try {
        let validateEmail = User.validateUser(email);
        if (validateEmail.valid) {

            let user = await User.query().findOne({
                email
            });

            if (user != undefined) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign({ email: email, userId: user.id }, 'nodeChallengeSecret', { expiresIn: '1h' });
                    return res.status(200).json({ message: 'Login succesful', userId: user.id, token: token });
                } else {
                    return res.status(401).json({ message: 'Incorrect password' });
                }
            } else {
                return res.status(500).json({ message: `Cannot find the user with the provided email: ${email}` });
            }
        } else {
            return res.status(400).json({ message: 'Please provide valid inputs', details: validateEmail.validationMessage });
        }


    } catch (error) {
        return res.status(500).json({ message: 'Internal error at login', error: JSON.stringify(error) });
    }

};




