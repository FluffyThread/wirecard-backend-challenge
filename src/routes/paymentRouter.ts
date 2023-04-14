import express from "express";
import { PaymentController } from "../controller/PaymentController";

export const paymentRouter = express.Router()
const paymentController = new PaymentController()

paymentRouter.post("/create", paymentController.createPayment)

paymentRouter.put("/update/:id", paymentController.updatePaymentStatus);

paymentRouter.get("/:id", paymentController.getPaymentById)