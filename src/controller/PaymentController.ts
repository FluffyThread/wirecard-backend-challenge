import { Request, Response } from "express";
import { PaymentBusiness } from "../business/PaymentBusiness";
import { Payment } from "../models/PaymentDTO";

const paymentBusiness = new PaymentBusiness()

export class PaymentController {
    createPayment = async (req: Request, res: Response) => {
        const payment: Payment = req.body
        try {
            const response = await paymentBusiness.processPayment(payment);
            res.status(201).json(response);
        } catch (error: any) {
            res.send({ error: error.message })
        }
    }

    getPaymentById = async (req: Request, res: Response) => {
        try {
          const paymentId = req.params.id;
          const payment = await paymentBusiness.getPaymentById(paymentId);
    
          res.status(200).send(payment);
        } catch (error:any) {
          res.send({ message: error.message });
        }
      };

    updatePaymentStatus = async(
        req: Request,
        res: Response
    ) =>  {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!id || !status) {
                throw new Error("Missing input");
            }

            await paymentBusiness.updatePaymentStatus(id, status);

            res.status(200).send({ message: "Payment status updated successfully: " + `'${status.toUpperCase()}'` });
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ message: error.message });
        }
    }
}