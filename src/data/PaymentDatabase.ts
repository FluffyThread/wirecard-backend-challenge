import { Payment } from "../models/PaymentDTO";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
    private static TABLE_NAME = "payments"

    createPayment = async (payment: Payment) => {
        try {
            await BaseDatabase.connection(`${PaymentDatabase.TABLE_NAME}`)
                .insert(payment)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    getPaymentById = async (id: string):Promise<Payment> => {
        try {
            let result = await BaseDatabase.connection(PaymentDatabase.TABLE_NAME)
                .select()
                .where({ id })
            return result[0]
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    getPaymentByUserId = async (clientId: string) => {
        try {
            let result = await BaseDatabase.connection(PaymentDatabase.TABLE_NAME)
                .select()
                .where('client_id', clientId)
                if (result.length === 0) {
                    return null;
                }
            return result
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    updatePaymentStatus = async (id: string, status: string): Promise<void> => {
        try {
            await BaseDatabase.connection(`${PaymentDatabase.TABLE_NAME}`)
                .where({ id })
                .update({ status });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    deletePayment = async(id:string):Promise<void> => {
        try {
            await BaseDatabase.connection(PaymentDatabase.TABLE_NAME)
            .delete()
            .where({id})
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);      
        }
    }


}