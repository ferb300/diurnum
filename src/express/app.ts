import { actionRoutes, viewRoutes } from "./routes"
var path = require('path');

const express = require('express')
export const app = express()

app.use(express.urlencoded());
app.use(express.cookieParser());

app.set('views', path.join(__dirname, '../../src/views'));
app.set('view engine', 'ejs');

app.use("/", viewRoutes);
app.use("/action", actionRoutes);