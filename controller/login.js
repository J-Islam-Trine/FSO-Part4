const loginController = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginController.post('/', async (req, res) => {
    const userData = req.body;

    const userCheck = await User.findOne({username: userData.username});

    if (userCheck)
    {
        const passwordCheck = await bcrypt.compare(userData.password, userCheck.passwordHash)
        // console.log(passwordCheck)
        if (passwordCheck)
        {
            const dataForToken = {
                username: userCheck.username,
                id: userCheck.id
            }

            const token = jwt.sign(dataForToken, process.env.SECRET)
            res.json({username: userCheck.username, token}).status(204)
        }
        else 
        {
            res.json({error: "pass didn't match"}).status(405);
        }
       
    }
    else res.status(404).json({error: "user not found!"});
});

module.exports = loginController