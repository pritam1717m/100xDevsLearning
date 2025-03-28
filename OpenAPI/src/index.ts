import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express'

const app = express();
app.use(express.json());

const swaggerDocument = require('../openapispec.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

app.get("/users", (req: Request, res: Response) => {
  const { name } = req.query;

  if (name) {
    const filterUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(String(name).toLowerCase());
    });
    res.json(filterUsers);
  } else {
    res.json(users);
  }
});

app.listen(3000, () => {
    console.log("Server started")
})
