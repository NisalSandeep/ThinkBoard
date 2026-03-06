const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const noteRoutes = require("./routes/noteRoutes");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(rateLimiter);


app.use((req, res, next) => {
  console.log("We have a new request!");
  next();
});

app.use("/api/notes", noteRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit with failure if database connection fails
  });
