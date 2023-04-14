import { Request, Response } from "express";
import { ClientsBusiness } from "../business/ClientsBusiness";

const clientsBusiness = new ClientsBusiness()

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
            console.log({controller:clientId});
            
            res.status(201).send({status:"Client successfully registered",clientId:clientId})
        } catch (error:any) {
            res.send({error:error.message})
        }
    }
}