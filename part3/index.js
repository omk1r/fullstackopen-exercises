const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((n) => n.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send({ error: "Person not found" });
  }
});

app.get("/info", (req, res) => {
  const personLength = persons.length;
  const currentDate = new Date();

  res.send(
    `<div><p>Phonebook has info for ${personLength} people</p><p>${currentDate.toString()}</p></div>`
  );
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

function generateRandomId(minValue = 1, maxValue = 1000000) {
  const range = maxValue - minValue;
  const randomDecimal = Math.random();
  const randomId = Math.floor(randomDecimal * range) + minValue;
  return randomId;
}

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const existingPerson = persons.find((n) => n.name === body.name);

  if (existingPerson) {
    return res.send({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  console.log(persons);

  res.send(person);
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
