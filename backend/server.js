import express from "express";
import authRoute from "./routes/auth.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //req.body (parse body)

app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
  connectDB();
});
