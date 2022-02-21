import { app } from "./express/app";

import mongoose, { ConnectionOptions } from "mongoose";
import "dotenv/config"


console.log("Connecting to Database");
mongoose.connect("mongodb://mongo:27017/abizitate", {
	useNewUrlParser: true,
	useUnifiedTopology: true
} as ConnectionOptions);

console.log("Starting to listen")
app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT || 8080}`);
});