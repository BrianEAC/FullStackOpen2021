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

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
