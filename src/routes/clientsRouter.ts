import express from "express";
import { ClientsController } from "../controller/ClientsController";

export const clientsRouter = express.Router()

const clientsController = new ClientsController()


// ENDPOINT PARA REGISTRAR UM NOVO CLIENT
clientsRouter.post("/register", clientsController.register)

// ENDPOINT PARA RETORNAR OS DADOS DE TODOS OS CLIENTES
clientsRouter.get("/all", clientsController.getAllClients)

// ENDPOINT PARA RETORNAR TODOS OS PAGAMENTOS DE DETERMINADO CLIENTE PELO ID DO CLIENTE
clientsRouter.get("/payments/:id", clientsController.getClientPayments)

// ENDPOINT PARA DELETER UM CLIENTE
clientsRouter.delete("/delete/:id", clientsController.deleteClient)