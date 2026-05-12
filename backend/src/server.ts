import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { ticketsRoutes } from "./routes/hubspot/tickets/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  return res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/tickets", ticketsRoutes);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});