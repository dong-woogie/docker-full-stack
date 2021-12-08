const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("welcome api server");
});

app.get("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM lists;", (error, results, fileds) => {
    if (error) return res.json({ success: false, error });
    return res.json({
      success: true,
      results,
    });
  });
});

app.post("/api/value", (req, res) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (error, result, fields) => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(PORT, () => {
  console.log(`start docker app backend , port is ${PORT}`);
});
