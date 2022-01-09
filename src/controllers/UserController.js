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
        //Validate user inputs
        const validateUser = User.validateUser(email, firstName, password);

        if (validateUser.valid) {
            //Checks if the user is already registered
            const existingUser = await User.findUserByEmail(email);

            if (existingUser === undefined) {
                //Creates the user
                const newUser = await User.create(email, firstName, lastName, password);
                return res.status(201).json({ message: 'User created succesfully', newUser: newUser.email });
            } else {
                return res.status(400).json({ message: 'User is already registered' });
            }
        } else {
            return res.status(400).json({ message: 'Please provide valid information', details: validateUser.validationMessage });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal error on creating', error: error.message });
    }
};
//POST
exports.login = async (req, res, next) => {
    const body = req.body;

    const email = body.email;
    const password = body.password;

    try {
        //Checks valid inputs
        let validateEmail = User.validateUser(email);

        if (validateEmail.valid) {
            //Checks if the user exists
            let user = await User.findUserByEmail(email);
            
            if (user != undefined) {
                //Decripts and compares the password stored in the DB with the password provided by the user
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    //Creates a token wich will be needed to perform all movie related requests
                    const token = jwt.sign({ email: email, userId: user.id }, 'nodeChallengeSecret', { expiresIn: '1h' });
                    return res.status(200).json({ message: 'Login succesful', token: token });
                } else {
                    return res.status(401).json({ message: 'Incorrect password' });
                }
            } else {
                return res.status(400).json({ message: `Cannot find the user with the provided email: ${email}` });
            }
        } else {
            return res.status(400).json({ message: 'Please provide valid inputs', details: validateEmail.validationMessage });
        }


    } catch (error) {
        return res.status(500).json({ message: 'Internal error at login', error: error.message });
    }

};




