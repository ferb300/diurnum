import { app } from "./express/app"
import mongoose from "mongoose";

mongoose.connect("mongodb://fffapp:fffapp@mongo-db:27017/fffapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT || 8080}`)
})

