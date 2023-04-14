// import { Payment } from "../models/PaymentDTO";
// import { validateCreditCardNumber } from "./isCreditCardValid";

// export function validatePayment(payment: Payment): any {
//     // Verifica se o tipo de pagamento é válido
//     if (payment.type !== 'boleto' && payment.type !== 'credit_card') {
//       throw new Error('Invalid payment type');
//     }
  
//     // Verifica se o valor do pagamento é maior do que zero
//     if (payment.amount <= 0) {
//       throw new Error('Payment amount must be greater than zero');
//     }
  
//     // Verifica se o comprador está definido
//     if (!payment.client_id) {
//       throw new Error('Buyer must be defined');
//     }
  
//     // Verifica se o cartão de crédito está completo
//     if (payment.type === 'credit_card' && ( !payment.holder_name || !payment.card_number || !payment.expiration_date || !payment.cvv)) {
//       throw new Error('Card information is incomplete');
//     }

//     // Verifica se o cartão de crédito é valido
//     if (payment.type === "credit_card") {
//       const creditCardNumber = payment.card_number as string
//       if (!validateCreditCardNumber(creditCardNumber)) {
//         throw new Error("Credit card is invalid");
        
//      }
//     }
  
//   }
  