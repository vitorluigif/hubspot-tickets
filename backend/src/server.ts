import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.routes.js";
import { ticketsRoutes } from "./routes/hubspot/tickets/index.js";
import type { Request, Response } from "express";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://hubspot-tickets.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_: Request, res: Response) => {
  return res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/tickets", ticketsRoutes);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});