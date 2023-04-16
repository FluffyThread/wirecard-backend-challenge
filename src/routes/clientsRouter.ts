import express from "express";
import { ClientsController } from "../controller/ClientsController";

export const clientsRouter = express.Router()

const clientsController = new ClientsController()

clientsRouter.post("/register", clientsController.register)

clientsRouter.get("/all", clientsController.getAllClients)

clientsRouter.get("/payments/:id", clientsController.getClientPayments)

clientsRouter.delete("/delete/:id", clientsController.deleteClient)