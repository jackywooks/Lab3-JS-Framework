const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());


const getData = () => {
  const data = fs.readFileSync("./data/data.json", "utf8");
  return JSON.parse(data);
};

//  `/users`  GET 
app.get("/users", (req, res) => {
    fs.readFile("./data/data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading data file");
        return;
      }
      res.json(JSON.parse(data));
    });
  });

//  Create 
app.post("/users", (req, res) => {
  const users = getData();
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);

  fs.writeFileSync("./data/data.json", JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

//  Update
app.put("/users/:id", (req, res) => {
  const users = getData();
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  users[userIndex] = { ...users[userIndex], ...req.body };

  fs.writeFileSync("./data/data.json", JSON.stringify(users, null, 2));
  res.json(users[userIndex]);
});

//  Delete 
app.delete("/users/:id", (req, res) => {
  let users = getData();
  const userId = parseInt(req.params.id);

  users = users.filter(user => user.id !== userId);
  fs.writeFileSync("./data/data.json", JSON.stringify(users, null, 2));
  
  res.send(`User with id ${userId} deleted`);
});

// 🛠 サーバーを起動
app.listen(PORT, () => {
  console.log(`Server3 is running on http://localhost:${PORT}`);
});
