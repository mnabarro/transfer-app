const db = require('../models');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');
const {generateAccessToken, generateRefreshToken, verifyToken } = require('../helpers/authTokens');
const authController = {

    signup: async (req, res) => {

        const rightNow = new Date();
        const birthDate = new Date(req.body.birthDate);

        let maxBirthDate = new Date();
        maxBirthDate.setFullYear(rightNow.getFullYear() - 18);

        if (birthDate > maxBirthDate) {
            return res.status(400).json({
                message: 'User must be at least 18 y/o to sign-in.'
            });
        }

        let usr = await db.Users.findOne({
            where: {
                email: {
                    [Op.like]: req.body.email
                }
            }
        });

        if (usr) {
            return res.status(400).json({
                message: 'Email already registered.'
            });
        }

        usr = await db.Users.findOne({
            where: {
                phoneNumber: {
                    [Op.like]: req.body.phoneNumber
                }
            }
        });

        if (usr) {
            return res.status(400).json({
                message: 'Phone number already registered.'
            });
        }

        try {
            await db.Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                phoneNumber: req.body.phoneNumber,
                birthDate: req.body.birthDate
            });

            return res.status(201).json({
                message: 'User created.'
            });

        } catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    },

    login: async (req, res) => {


        let usr = await db.Users.findOne({
            where: {
                email: {
                    [Op.like]: req.body.email
                }
            }
        });

        if (!usr) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        if (await bcryptjs.compare(req.body.password, usr.password)) {
            const accessToken = generateAccessToken ({user: usr.uuid});
            const refreshToken = generateRefreshToken ({user: usr.uuid});
            return res.json ({accessToken, refreshToken});
            } 
            else {
            return res.status(401).json({message: 'Password incorrect'});
            }

    },

    refresh: async (req, res) => {

        const token = req.body.refreshToken;
        
        if (!token) {
            return res.status(401).json({
                message: 'Refresh token not present.'
            });
        }    
        
        const  tokenInDb = await db.Tokens.findOne({
            where: {
                token: {
                    [Op.like]: token
                }
            }
        });
        
        if (!tokenInDb) {
            return res.status(400).json({
                message: 'Refresh token has no authorization.'
            });
        }    

        try {
            const verify = verifyToken(token);

            if ( verify ) {
                return res.status(201).json({
                    message: 'OK!'
                });    
            }
        } catch ( err ) {

            db.Tokens.destroy({
                where: {
                    token: {
                        [Op.like]: token
                    }
                }                            
            });

            return res.status(401).json({
                message: err.message
            });
        }

        
    },

    logout: (req, res) => {
        return res.status(200).json({
            message: '/auth/logout'
        });
    },
}

module.exports = authController;