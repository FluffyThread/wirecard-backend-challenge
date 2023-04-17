import { ClientsDatabase } from "../data/ClientsDatabase";
import { PaymentDatabase } from "../data/PaymentDatabase";
import { ClientsDTO, client } from "../models/ClientsDTO";
import { IdGenerator } from "../services/IdGenerator";


const idGenerator = new IdGenerator()
const paymentDatabase = new PaymentDatabase()

export class ClientsBusiness {

    clientDatabase: ClientsDatabase;
    paymentDatabase: PaymentDatabase

    constructor(clientDatabase: ClientsDatabase, paymentDatabase : PaymentDatabase) {
      this.clientDatabase = clientDatabase
      this.paymentDatabase = paymentDatabase
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
        try {
            if (!userId) {
                throw new Error("Missing ID");
            }
            let client = await this.clientDatabase.getById(userId)
            if (!client) {
                throw new Error("Client does not exist");
            }
            let payments = await this.paymentDatabase.getPaymentByUserId(userId)
            console.log(payments);
            
            if (!payments) {
                throw new Error("This client has not made any payment yet");   
            }
            let response = await this.clientDatabase.getClientWithPayments(userId)
    
            return response
            
        } catch (error:any) {
            throw new Error(error.message);
            
        }

    }

    getAllClients = async() => {
        try {
            let response = await this.clientDatabase.getAll()
            if (response.length < 1) {
                throw new Error("No client was found");
            }
            return response
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteClient = async (id:string) => {
        try {
            if (!id) {
                throw new Error("Missing ID");    
            }
            let result:ClientsDTO = await this.clientDatabase.getById(id)
            if (!result) {
                throw new Error("No client was found");
            }
            
            await this.clientDatabase.deleteClient(id)
            let response = {
                status:"Client was successfully deleted!",
            }
            return response
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}