const express = require('express');
const app = express();
const config = require('./utils/config')
const blogsRouter = require('./controller/blogs');

const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const userRouter = require('./controller/users');
const loginController = require('./controller/login');
const middleware = require('./middlewares/jswtmiddle')

logger.info('connecting to', config.DB_URL);
mongoose.connect(config.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => logger.info('connected to DB!'))
.catch((error) => { logger.error(`error connecting to DB`, error.message) })

// const errorHandler = (err, req, res, next) => {
//     if (err.name == 'ValidationError')
//     {
//         return res.json(400).json({error: err.message})
//     }

//     next(err)
// }


app.use(cors());
app.use(express.json());
app.use(middleware.getToken)
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', userRouter)
app.use('/api/login', loginController)
// app.use(errorHandler);

module.exports = app;