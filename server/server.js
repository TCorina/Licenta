const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Suport pentru JSON în request body
app.use("/api", routes);

// Pornire server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
