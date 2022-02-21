const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require('./utils/middleware')
require('express-async-errors')
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


logger.info("connecting to port", config.PORT);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app;
