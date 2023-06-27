const express = require("express");
const db = require("./configs/db");

const app = express();

const PORT = 3000;
db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
    });
  })
  .catch(console.error);
