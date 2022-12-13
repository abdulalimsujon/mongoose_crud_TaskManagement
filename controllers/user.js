const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const userSchema = require('../models/user');

const User = new mongoose.model('User', userSchema);


exports.UserSignup = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10,)
    try {
        const newUser = new User({



            name: req.body.name,
            userName: req.body.userName,
            password: hashPassword


        },);

        await newUser.save();
        res.status(200).json({ msg: 'sign in is successful' })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}


exports.userLogin = async (req, res) => {

    try {
        const user = await User.find({ userName: req.body.userName })

        if (user && user.length > 0) {

            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {

                //generate token

                const token = jwt.sign({
                    userName: user[0].userName,
                    userId: user[0]._id
                }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                res.status(200).json({ Token: token, msg: 'login successfully' })

            } else {
                res.status(401).json({ "message": 'authentication failed' })
            }

        }

    } catch (error) {
        res.status(401).json({ "message": 'authentication failed' })
    }

}

