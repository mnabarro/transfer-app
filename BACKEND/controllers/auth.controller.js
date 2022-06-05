const db = require('../models');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

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

    login: (req, res) => {
        return res.status(200).json({
            message: '/auth/login'
        });
    },

    logout: (req, res) => {
        return res.status(200).json({
            message: '/auth/logout'
        });
    },
}

module.exports = authController;