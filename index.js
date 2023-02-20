import { v4 as uuidv4 } from "uuid";
import express from "express";

const app = express();

app.use(express.json());

let data = [];

app.get("/welcome", (req, res) => {
  return res.status(200).json("Bem vindo!!");
});

app.post("/create", (req, res) => {
  let entry = { ...req.body, id: uuidv4() };

  entry = {
    name: "Brenno",
    surname: "Eudes",
    age: 37,
    city: "Rio de Janeiro",
    id: "0dfe8f3d-efb4-4b34-9fcd-c227aad1e595",
  };

  data.push(entry);

  return res.status(201).json(entry);
});

app.post("/create", (req, res) => {
  console.log(req.body);
});

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  let { id } = req.params;

  let user = data.find((user) => user.id === id);

  return res.status(200).json(user);
});

app.delete("/:idUser", (req, res) => {
  let { idUser } = req.params;

  let filtered = data.filter((user) => user.id !== idUser);

  data = filtered;

  return res.status(200).json(data);
});

app.put("/:idUser", (req, res) => {
  let { idUser } = req.params;

  let index;

  let user = data.find((user, i) => {
    index = i;
    return user.id === idUser;
  });

  let updatedUser = { ...user, ...req.body };

  data.splice(index, 1);

  data.push(updatedUser);

  return res.status(200).json(updatedUser);
});

app.listen(4000, () => {
  console.log("Server up and running on port: 4000");
});
