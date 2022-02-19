import express from "express";

import cookieParser from "cookie-parser"
import path from "path";

import { actionRoutes, viewRoutes } from "./routes"
import forms from "./middleware/forms";


export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());
app.use(forms)

app.set('views', path.join(__dirname, '../../src/views'));
app.set('view engine', 'ejs');

app.use("/", viewRoutes);
app.use("/action", actionRoutes);