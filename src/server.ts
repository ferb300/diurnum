import { app } from "./express/app"

require('dotenv').config()

app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT || 8080}`)
})

