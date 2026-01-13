const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const databaseConnection = require("./config/db.js");
const globalError = require("./middleware/errorHandling");
const phishingRoutes = require('./routes/phishingRoutes.js')

const app = express();
const port = process.env.PORT;

app.use(cors());
databaseConnection();
app.use(express.json());


if(process.env.NODE_ENV === "development")
{
  app.use(morgan("dev"));

}

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});


app.use('/api/campaign',phishingRoutes)


process.on("unhandledRejection", (error) => {
  console.log(`unhandledRejection Error: ${error.name} | ${error.massage}`);
});



app.use(globalError);


app.listen(port, () => {
  console.log("Application Running Successfuly");
});
