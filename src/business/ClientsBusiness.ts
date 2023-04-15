import { ClientsDatabase } from "../data/ClientsDatabase";
import { client } from "../models/ClientsDTO";
import { IdGenerator } from "../services/IdGenerator";

const clientsDatabase = new ClientsDatabase()
const idGenerator = new IdGenerator()

export class ClientsBusiness {

    

    register = async(client:client) => {
        try {
            if (!client.name || !client.email || !client.cpf) {
                throw new Error("All fields must be filled: 'name', 'email', 'cpf'");   
            }
            const id = idGenerator.generateId()
            const input = {
                id,
                name:client.name,
                email:client.email,
                cpf:client.cpf
            }
            await clientsDatabase.register(input)
            console.log({business:id});
            
            return id
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    getClientWithPayments = async(userId:string) => {
        if (!userId) {
            throw new Error("Missing ID");
        }
        let response = clientsDatabase.getClientWithPayments(userId)

        return response

    }
}