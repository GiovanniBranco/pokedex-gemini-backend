import express from "express";
import { router } from "./routes/router";

const app = express();

app.use(express.json());

app.use(router);

app.listen(3000, () => "server running on port 3000");