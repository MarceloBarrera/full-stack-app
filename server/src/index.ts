import express from "express";
import cors from "cors";
import path from "path";
import { people } from "../data/people.json";
import { overlays } from "../data/overlays.json";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes

app.get("/people", (_req, res) => res.json(people));

app.post("/people", (req, res) => {
  const newPerson = req.body;
  // use a guid generator.
  // for simplicity, we will use the length of the array + 1 as the id
  newPerson.id = (people.length + 1).toString();
  people.push(newPerson);
  return res.json(newPerson);
});

app.get("/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }
  return res.json(person);
});

app.get("/overlays", (req, res) =>
  // console.log("path:", __dirname);
  // could be done with sendFile as well
  // res.sendFile(path.join(__dirname, "../data", "overlays.json"));
  res.json(overlays)
);

app.use("/mock", express.static(path.join(__dirname, "../data")));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
