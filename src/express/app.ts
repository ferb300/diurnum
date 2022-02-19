import express from "express";
import cookieParser from "cookie-parser"

import path from "path";

import { actionRoutes, viewRoutes } from "./routes"


export const app = express()

app.use(express.urlencoded());
app.use(cookieParser());

app.set('views', path.join(__dirname, '../../src/views'));
app.set('view engine', 'ejs');

app.use("/", viewRoutes);
app.use("/action", actionRoutes);