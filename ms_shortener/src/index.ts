import { config } from "config/environment.config.js";
import cors from "cors";
import ErrorARCube from "errors/Error.js";
import express from "express";
import logger from "log/config.js";
import { handleError } from "middleware/errors.js";
import mongoose from "mongoose";
import morgan from "morgan";
import { globalErrorHandler } from "./errors/errorHandler.js";
import urlRoutes from "routes/url.route.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(handleError);
app.use(express.json());

// api routes
app.use(`/api/${config.api_version}`, urlRoutes)


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,authorization,content-type"
    );
    // res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


const PORT = config.port;
const mongoURI = `mongodb://${config.db_user}:${config.db_password}@${config.db_host}:${config.db_port}/arcube?authSource=admin`;

console.log(mongoURI);

const startServer = async () => {
    try {
        await mongoose.connect(mongoURI);
        logger.info("DB connection successful!!");
        app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
    } catch (error) {
        logger.error("DB connection failed:", error);
    }
};
startServer();

app.all("*", (req, res, next) => {
    const err = new ErrorARCube(`Can't find ${req.originalUrl} on this server!`);
    err.status = "fail";
    err.code = 404;
    next(err);
});

app.use(globalErrorHandler);