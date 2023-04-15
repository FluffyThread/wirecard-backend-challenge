import { PaymentBusiness } from "../src/business/PaymentBusiness";
import { PaymentDatabase } from "../src/data/PaymentDatabase";
import { Payment } from "../src/models/PaymentDTO";


describe('processPayment', () => {
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
    
      it('should create a payment successfully with boleto type', async () => {
        const payment:Payment = {
          type: 'boleto',
          amount: 100,
          client_id: 'client_id',
        };
    
        let response = await paymentBusiness.processPayment(payment);
    
        expect(paymentDatabase.createPayment).toHaveBeenCalledWith(expect.objectContaining({
          type: 'boleto',
          amount: 100,
          client_id: 'client_id',
        }));
        expect(response.paymentId).toBeDefined();
        expect(response.status).toBe('Payment created successfully');
        expect(response.boletoNumber).toBeDefined();
        expect(response.cardIssuer).toBeNull();
      });
})

describe("updatePaymentStatus", () => {
    let paymentBusiness: PaymentBusiness;
    let paymentDatabase: jest.Mocked<PaymentDatabase>;
  
    beforeEach(() => {
      paymentDatabase = {
        processPayment: jest.fn(),
        updatePaymentStatus: jest.fn(),
      } as unknown as jest.Mocked<PaymentDatabase>;
  
      paymentBusiness = new PaymentBusiness(paymentDatabase);
    });
  
    test("should throw an error when missing input", async () => {
      expect.assertions(1);
      try {
        await paymentBusiness.updatePaymentStatus("", "");
      } catch (error:any) {
        expect(error.message).toBe("Missing input");
      }
    });
  
    test("should throw an error when invalid status is provided", async () => {
      expect.assertions(1);
      try {
        await paymentBusiness.updatePaymentStatus("123", "invalid");
      } catch (error:any) {
        expect(error.message).toBe("Invalid status. Please use one of the following options: 'authorized', 'paid', 'refunded', or 'chargedback'.");
      }
    });
  
    test("should throw an error when payment is not found", async () => {
        const getPaymentByIdMock = jest.fn().mockImplementation(async (clientId: string) => {
            return undefined
          });
      paymentDatabase.getPaymentById = getPaymentByIdMock
  
      expect.assertions(1);
      try {
        await paymentBusiness.updatePaymentStatus("123", "authorized");
      } catch (error:any) {
        expect(error.message).toBe("Payment not found");
      }
    });
  
    test("should update payment status successfully", async () => {
      const mockPayment:Payment = {
        id: "123",
        amount: 100,
        status: "authorized",
        type:"boleto",
        client_id: "456",
      };

      const getPaymentByIdMock = jest.fn().mockImplementation(async (clientId: string) => {
        return mockPayment
      });
  
      paymentDatabase.getPaymentById = getPaymentByIdMock
  
      await paymentBusiness.updatePaymentStatus("123", "paid");
  
      expect(paymentDatabase.getPaymentById).toHaveBeenCalledWith("123");
      expect(paymentDatabase.updatePaymentStatus).toHaveBeenCalledWith("123", "PAID");
    });
  });
 
  
  