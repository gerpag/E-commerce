const express = require("express");
const db = require("./configs/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const index = require("./models");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
//app.use("/", routes);

// Manejo de errores global
app.use((err, req, res, next) => {
  // Manejo de errores
  res.status(500).json({ error: "Internal Server Error" });

  // Loggeo de errores
  console.error(err);
});

const PORT = 3000;
db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
    });
  })
  .catch(console.error);
