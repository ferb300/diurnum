import mongoose from "mongoose";

import { app } from "./express/app";


/*console.log("Connecting to Database");
mongoose.connect("mongodb://mongo:27017/abizitate", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});*/

console.log("Starting to listen")
app.listen(process.env.PORT || 8080, () => {
	console.log(`Listening at port ${process.env.PORT || 8080}`);
});