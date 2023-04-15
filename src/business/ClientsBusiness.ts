import { ClientsDatabase } from "../data/ClientsDatabase";
import { client } from "../models/ClientsDTO";
import { IdGenerator } from "../services/IdGenerator";


const idGenerator = new IdGenerator()

export class ClientsBusiness {

    clientDatabase: ClientsDatabase;

    constructor(clientDatabase: ClientsDatabase) {
      this.clientDatabase = clientDatabase;
    }

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
            await this.clientDatabase.register(input)
            
            return id
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    getClientWithPayments = async(userId:string) => {
        if (!userId) {
            throw new Error("Missing ID");
        }
        let response = this.clientDatabase.getClientWithPayments(userId)

        return response

    }
}