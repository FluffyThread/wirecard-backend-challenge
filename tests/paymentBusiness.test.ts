import { PaymentBusiness } from "../src/business/PaymentBusiness";
import { PaymentDatabase } from "../src/data/PaymentDatabase";
import { Payment } from "../src/models/PaymentDTO";


describe('PaymentBusiness', () => {
    let paymentBusiness: PaymentBusiness;
    let paymentDatabase: PaymentDatabase;
  
    beforeEach(() => {
      paymentDatabase = {
        createPayment: jest.fn(),
      } as unknown as PaymentDatabase;
  
      paymentBusiness = new PaymentBusiness(paymentDatabase);
    });
  
    it('should throw an error for invalid payment type', async () => {
      const payment:Payment = {
        type: 'invalid',
        amount: 100,
        client_id: 'client_id',
      };
  
      await expect(paymentBusiness.processPayment(payment)).rejects.toThrow("Invalid payment type. Please use one of the following options: 'boleto' or 'credit_card'");
    });

    it('should throw an error for payment amount less than or equal to zero', async () => {
        const payment:Payment = {
          type: 'boleto',
          amount: 0,
          client_id: 'client_id',
        };
    
        await expect(paymentBusiness.processPayment(payment)).rejects.toThrow('Payment amount must be greater than zero');
      });
    
      it('should throw an error for missing buyer information', async () => {
        const payment:Payment = {
          type: 'credit_card',
          amount: 100,
        };
    
        await expect(paymentBusiness.processPayment(payment)).rejects.toThrow('Buyer must be defined');
      });
    
      it('should throw an error for incomplete credit card information', async () => {
        const payment:Payment = {
          type: 'credit_card',
          amount: 100,
          client_id: 'client_id',
          card_holder: 'card_holder',
          card_number: 'card_number',
          card_expiration_date: 'card_expiration_date',
        };
    
        await expect(paymentBusiness.processPayment(payment)).rejects.toThrow('Card information is incomplete');
      });
    
      it('should throw an error for invalid credit card', async () => {
        const payment:Payment = {
          type: 'credit_card',
          amount: 100,
          client_id: 'client_id',
          card_holder: 'card_holder',
          card_number: 'invalid_card_number',
          card_expiration_date: 'card_expiration_date',
          card_cvv: 'card_cvv',
        };
    
        await expect(paymentBusiness.processPayment(payment)).rejects.toThrow('Credit card is invalid');
      });
    
    //   it('should create a payment successfully with boleto type', async () => {
    //     const payment:Payment = {
    //       type: 'boleto',
    //       amount: 100,
    //       client_id: 'client_id',
    //     };
    
    //     await paymentBusiness.processPayment(payment);
    
    //     expect(paymentDatabase.createPayment).toHaveBeenCalledWith(expect.objectContaining({
    //       type: 'boleto',
    //       amount: 100,
    //       client_id: 'client_id',
    //     }));
    //   });
})