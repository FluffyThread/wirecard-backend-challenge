import express from "express";
import { ClientsController } from "../controller/ClientsController";

export const clientsRouter = express.Router()

const clientsController = new ClientsController()

clientsRouter.post("/register", clientsController.register)