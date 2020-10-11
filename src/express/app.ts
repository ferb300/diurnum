import { dbRoutes, viewRoutes } from "./routes"
var path = require('path');

const express = require('express')
export const app = express()

app.use(express.urlencoded());

app.set('views', path.join(__dirname, '../../src/views'));
app.set('view engine', 'ejs');

app.use("/views", viewRoutes);
app.use("/db", dbRoutes);