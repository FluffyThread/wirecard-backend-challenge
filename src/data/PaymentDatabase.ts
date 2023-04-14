import { Payment } from "../models/PaymentDTO";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
    private static TABLE_NAME="payments"

    createPayment = async(payment:Payment) => {
        try {
            await BaseDatabase.connection(`${PaymentDatabase.TABLE_NAME}`)
            .insert(payment)    
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
            
        }
    }

    getPaymentById = async(id:string) => {
        try {
            let result = await BaseDatabase.connection(PaymentDatabase.TABLE_NAME)
            .select()
            .where({id})
            return result
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    updatePaymentStatus = async(id: string, status: string): Promise<void> => {
        try {
          await BaseDatabase.connection(`${PaymentDatabase.TABLE_NAME}`)
            .where({ id })
            .update({ status });
        } catch (error:any) {
          throw new Error(error.sqlMessage || error.message);
        }
      }

      
}