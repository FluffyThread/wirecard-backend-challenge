import { PaymentDatabase } from "../data/PaymentDatabase";
import { Payment } from "../models/PaymentDTO";
import { IdGenerator } from "../services/IdGenerator";
import { generateBoletoNumber } from "../services/boletoGenerator";
import { validateCreditCardNumber } from "../services/isCreditCardValid";

const paymentDatabase = new PaymentDatabase()
const idGenerator = new IdGenerator()
export class PaymentBusiness {

  paymentDatabase: PaymentDatabase;

  constructor(paymentDatabase: PaymentDatabase) {
    this.paymentDatabase = paymentDatabase;
  }

    processPayment = async (payment: Payment) => {

        // Verifica se o tipo de pagamento é válido
        if (payment.type !== 'boleto' && payment.type !== 'credit_card') {
            throw new Error("Invalid payment type. Please use one of the following options: 'boleto' or 'credit_card'");
        }

        // Verifica se o valor do pagamento é maior do que zero
        if (payment.amount <= 0) {
            throw new Error('Payment amount must be greater than zero');
        }

        // Verifica se o comprador está definido
        if (!payment.client_id) {
            throw new Error('Buyer must be defined');
        }

        // Verifica se o cartão de crédito está completo
        if (payment.type === 'credit_card' && (!payment.card_holder || !payment.card_number || !payment.card_expiration_date || !payment.card_cvv)) {
            throw new Error('Card information is incomplete');
        }


        let creditCardNumber = payment.card_number as string
        let cardData = null
 
        // Verifica se o cartão de crédito é valido
        if (payment.type === "credit_card") {
          cardData = validateCreditCardNumber(creditCardNumber)
          if (!cardData.isValid) {
            throw new Error("Credit card is invalid");
          }
        }
        
        const id = idGenerator.generateId()

        let paymentData: Payment = {
            ...payment,
            id,
            boleto_number: payment.type === "boleto" ? generateBoletoNumber() : undefined
          };

        await this.paymentDatabase.createPayment(paymentData)

        const response = {
            paymentId:id,
            status:"Payment created successfully",
            boletoNumber: payment.type === "boleto" ? paymentData.boleto_number : null,
            cardIssuer: cardData !== null ? cardData.issuer : null
        }
        return response
    }

    getPaymentById = async (id: string): Promise<Payment> => {
        const payment:any = await this.paymentDatabase.getPaymentById(id);
    
        if (!payment) {
          throw new Error("Payment not found");
        }
    
        return payment;
      };

    updatePaymentStatus = async(id: string, status: string):Promise<void> => {
        if (!id || !status) {
          throw new Error("Missing input");
        }

        if (status !== 'authorized' &&  status !== 'paid' && status !== 'refunded' && status !== 'chargedback') {
            throw new Error("Invalid status. Please use one of the following options: 'authorized', 'paid', 'refunded', or 'chargedback'.");
        }
    
        const payment = await this.paymentDatabase.getPaymentById(id);
    
        if (!payment) {
          throw new Error("Payment not found");
        }
    
        await this.paymentDatabase.updatePaymentStatus(id, status.toUpperCase());

      }

    // getClientPayments = async(id:string) => {
    //     try {
    //         const payments = await paymentDatabase.getClientPayments(id);
    //         if (payments.length < 1) {
    //             throw new Error("No payment has been made by this user");     
    //         }
    //         return payments;
    //     } catch (error:any) {
    //         throw new Error(error.message);
    //     }
    // }

}