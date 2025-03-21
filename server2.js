const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;


app.get("/users", (req, res) => {
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }
    res.json(JSON.parse(data));
  });
});


app.listen(PORT, () => {
  console.log(`Server2 is running on http://localhost:${PORT}/users`);
});
