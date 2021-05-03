var userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
    try
    {
        const users = await User.find({}).populate('blogs', 'title');
        res.json(users).status(202);
    }
    catch(exception)
    {
        res.json({"error": `${exception}`}).status(403);
    }
})

userRouter.post('/', async (req, res) => {
    
const userData = req.body
const saltRounds = 10;
if (!userData.username || !userData.password)
{
    res.status(401).send({error : "Username and password needed"});
}
else if (userData.username.length < 3 || userData.password.length < 3)
{
    res.status(401).send({"error" : "Username and password must be at least 3 characters long."});
}
else
{
    const passwordHash = await bcrypt.hash(userData.password, saltRounds)
const newUser = new User({
    name: userData.name,
    username: userData.username,
    blogs: [],
    passwordHash
})

try 
{
    const result = await newUser.save();
    res.json(result).status(201);
}
catch(e)
{
    if (e._message == "user validation failed")
    {
        res.status(409).send({"error" : "username already exists"})
    }
    else 
    {
        res.status(400).send({"error" : "some error occured"})
    }
}
}
})





module.exports = userRouter;