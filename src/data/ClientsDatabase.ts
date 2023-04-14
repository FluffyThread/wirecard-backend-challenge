import { ClientsDTO } from "../models/ClientsDTO";
import { BaseDatabase } from "./BaseDatabase";

export class ClientsDatabase extends BaseDatabase {
    private static TABLE_NAME="clients"

    register = async(input:ClientsDTO) => {
        try {
            await BaseDatabase.connection(`${ClientsDatabase.TABLE_NAME}`)
            .insert(input)
        } catch (error:any) {
            throw new Error(error.message);   
        }
    }
}