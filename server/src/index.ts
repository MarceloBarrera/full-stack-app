import express from "express";
import cors from "cors";
import path from "path";
import { overlays } from "../data/overlays.json";
import peopleRoute from "./routes/peopleRoute";
import tasksRoute from "./routes/tasksRoute";

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

app.use("/people", peopleRoute);
app.use("/tasks", tasksRoute);

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
