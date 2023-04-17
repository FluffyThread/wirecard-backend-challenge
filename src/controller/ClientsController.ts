import { Request, Response } from "express";
import { ClientsBusiness } from "../business/ClientsBusiness";
import { ClientsDatabase } from "../data/ClientsDatabase";
import { PaymentDatabase } from "../data/PaymentDatabase";


const clientDatabase = new ClientsDatabase()
const paymentDatabase = new PaymentDatabase()
const clientsBusiness = new ClientsBusiness(clientDatabase, paymentDatabase)

export class ClientsController {
    register = async(req:Request, res:Response) => {
        const { name, email, cpf } = req.body
        try {
            const input = {
                name,
                email,
                cpf
            }
            const clientId = await clientsBusiness.register(input)
            
            res.status(201).send({status:"Client successfully registered",clientId:clientId})
        } catch (error:any) {
            res.send({error:error.message})
        }
    }
    getClientPayments = async (req:Request, res:Response) => {
        try {
          const { id } = req.params;

          let result = await clientsBusiness.getClientWithPayments(id)
      
          res.status(200).send( result );
        } catch (error:any) {
          res.status(400).send({ error: error.message });
        }
      };

      getAllClients = async(req:Request, res:Response) => {
        try {
          let response = await clientsBusiness.getAllClients()
          res.status(200).send(response)
        } catch (error:any) {
          res.status(404).send(error.message)
        }
      }

      deleteClient = async (req:Request, res:Response) => {
        try {
          const { id } = req.params;
          let response = await clientsBusiness.deleteClient(id)
          res.status(200).send(response)
        } catch (error:any) {
          res.send({error: error.message})
        }
      }
}