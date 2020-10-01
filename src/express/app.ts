import { dbRoutes, viewRoutes } from "./routes"

const express = require('express')
export const app = express()

app.use("/views", viewRoutes);
app.use("/db", dbRoutes);
