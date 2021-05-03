const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User  = require('../models/user');
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (req, res,) => {

            if (req.token == null)
            {
                res.status(400).send({"error" : "json token needed"})
            }
            else {
                const orders = await Blog.find({}).populate('user', 'name');
                res.status(200).json(orders);
            }
            
            
})

blogsRouter.post('/', async (req, res) => {
    const body  = req.body;
   const user = req.user;
    // const token = getToken(req);

    // if (!body.user)
    // {
    //     const userList = await User.find({});
    
    //     const userNumber  = Math.floor(Math.random() * userList.length);
    //     userId = userList[userNumber].id;
    //     userBlogs = userList[userNumber].blogs;
    //     console.log(userId);
    // }

    if (!req.token || !req.user)
    {
        res.status(401).send({"error": "Token missing or expired."})
    }

    if (!body.title || !body.url )
    {
        res.status(400).send({"error": "Title and Url required."})
    }

    const userData = await User.findById(req.user)
    const userBlogs = userData.blogs;

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        like: body.like ? body.like : 0,
        user: req.user
    })

     try
     {
         const result = await newBlog.save();
         userBlogs.push(result.id);
         await User.findByIdAndUpdate(req.user, {blogs:userBlogs});
         res.status(201).json(result);
     }
     catch(exception)
     {
        //  next(exception);
        console.log(exception);
        res.status(400).end();
     }
});

blogsRouter.delete('/:id', async (req, res) => {

        if( await Blog.findById(req.params.id))
        {  
            if (req.token)
            { 
            
            const userId = (await Blog.findById(req.params.id)).user; 
            if (req.user == userId)
            {
            await Blog.findByIdAndRemove(req.params.id);
             res.status(204).send({"message" : "deleted."});
            }
            else
            {
                res.status(409).send({"error" : "user not permitted to do this action"});
            }
            }
            else res.status(405).send({error: "there's no token"})
            
        }
        else
        {
          throw error.message('malformed url')
        }

})

blogsRouter.put('/:id', async (req, res) => {

    try
    {
        if( await Blog.findById(req.params.id))
        {
            if (!req.token)
            {
                res.status(404).send({"error" : "jwt required."})
            }
            else if (!req.user)
            {
                res.status(404).send({"error" : "user not allowed"})
            }
            else if (req.user == (await Blog.findById(req.params.id)).user)
            {
                const response =  await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true});
                res.status(204).json(response);
            }
        }
        else
        {
          throw 'malformed id'
        }
     
    }
    catch(error)
    {
     //    next(exception);
       console.log(error.message);
       res.status(410).send({error: error });
    }
})

module.exports = blogsRouter;