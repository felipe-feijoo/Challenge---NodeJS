const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const token = authHeader.split(' ')[1]; 
    let decodedToken;
    try {

        decodedToken = jwt.verify(token, 'nodeChallengeSecret');
        
    } catch (error) {
        return res.status(500).json({ message: 'Auth - Internal error at validating token', error: JSON.stringify(error) });
    }

    if (!decodedToken) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    next();
};