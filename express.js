const express = require("express");
const UserModel = require("../server/src/models/user.model");


// MIDDLEWARE -> executa antes de qualquer execução
const app = express();

// USANDO EJS -> adicionando um front-end ao projeto;
app.set("view engine", 'ejs');
app.set('views', './src/views');
app.get("/views/users", async (req,res) => {
  const users = await UserModel.find({});
  res.render('index', { users });
});

app.use((req, res ,next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);
  next();
})

//para reconhecer para o servidor que vou usar json
app.use(express.json());

app.get("/home", (req, res) => {
  res.status(200).send("<h1>Hello Node!</h1>");
});

// CRIAR
app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// LISTAR
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// LISTAR POR ID
//depois de "/users" colca-se um parametro -> "/users/:parametro"
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ATUALIZAR
// PATCH -> mudar o registro PARCIALMENTE
// PUT -> mudar o registro por COMPLETO

app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETAR

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//LISTEN
const port = 8080;
app.listen(port, () => console.log("Rodando em", port));
