const express = require("express");
const db = require("./configs/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const index = require("./models");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
    });
  })
  .catch(console.error);
