import { Router } from "express";

import { GetMyTicketsController } from "../../../controllers/hubspot/tickets/get-my-tickets.controller.js";
import { CreateTicketController } from "../../../controllers/hubspot/tickets/create-ticket.controller.js";
import { ensureAuthenticated } from "../../../middlewares/ensure-authenticated.js";

const ticketsRoutes = Router();

const getMyTicketsController = new GetMyTicketsController();
const createTicketController = new CreateTicketController();

ticketsRoutes.get("/me", ensureAuthenticated, getMyTicketsController.handle);
ticketsRoutes.post("/", ensureAuthenticated, createTicketController.handle);

export { ticketsRoutes };