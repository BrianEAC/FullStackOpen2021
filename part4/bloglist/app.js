const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");

const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");

logger.info("connecting to port", config.PORT);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);



app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
