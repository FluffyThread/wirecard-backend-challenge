import express from "express";
import { PaymentController } from "../controller/PaymentController";

export const paymentRouter = express.Router()
const paymentController = new PaymentController()


// ENDPOINT PARA CRIAR UM NOVO PAGAMENTO
paymentRouter.post("/create", paymentController.createPayment)

//ENDPOINT PARA MUDAR O STATUS DE UMA COMPRA PELO ID DA COMPRA
paymentRouter.put("/update/:id", paymentController.updatePaymentStatus);

// ENDPOINT PARA BUSCAR OS DADOS DE UMA COMPRA PELO ID DA COMPRA
paymentRouter.get("/:id", paymentController.getPaymentById)

// ENDPOINT PARA DELETAR UM PAGAMENTO
paymentRouter.delete("/delete/:id", paymentController.deletePayment)

// ENPOINT QUE ACREDITO SER INUTIL NO MOMENTO POR JÁ TER UM MAIS COMPLETO NA ENTIDADE CLIENTS
// paymentRouter.get("/client/:id", paymentController.getUserPayments)