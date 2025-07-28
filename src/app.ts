import express from "express";
import indexRoute from "./routes/index.route";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api", indexRoute);
app.use(errorHandler);

export default app;
