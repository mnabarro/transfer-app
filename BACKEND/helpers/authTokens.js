const jwt = require('jsonwebtoken');
const db = require ('../models');

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1m"
    })
}

const generateRefreshToken = (user) => {
    const refreshToken =
        jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "2m"
        })
    db.Tokens.create({token: refreshToken});

    return refreshToken
}

const verifyToken = ( token ) => {
    return jwt.verify( token, process.env.REFRESH_TOKEN_SECRET );
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}