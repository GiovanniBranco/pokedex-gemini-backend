import express from "express";
import { router } from "./routes/router";
require("dotenv").config();
var cors = require("cors");
1234;

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(8080, () => "server running on port 8080");
