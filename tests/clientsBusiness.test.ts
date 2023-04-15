import { ClientsBusiness } from "../src/business/ClientsBusiness";
import { ClientsDatabase } from "../src/data/ClientsDatabase";
import { ClientsDTO } from "../src/models/ClientsDTO";
import { Payment } from "../src/models/PaymentDTO";


describe("register", () => {
    let clientsBusiness: ClientsBusiness;
    let clientsDatabase: ClientsDatabase;
    beforeEach(() => {
        clientsDatabase = {
            register: jest.fn(),
        } as unknown as ClientsDatabase;

        clientsBusiness = new ClientsBusiness(clientsDatabase);
    });

    test("Should throw an error when required fields are missing", async () => {
        const client = {
            name: "John Doe",
            email: "",
            cpf: "12345678910",
        };

        expect.assertions(1);
        try {
            await clientsBusiness.register(client);
        } catch (error:any) {
            expect(error.message).toEqual("All fields must be filled: 'name', 'email', 'cpf'");
        }
    });

    test("Should register a client successfully", async () => {
        const client = {
            name: "John Doe",
            email: "john.doe@example.com",
            cpf: "12345678340",
        };

        const id = await clientsBusiness.register(client);

        expect(id).toBeDefined();
        expect(id.length).toBeGreaterThan(0);
    });
});

describe("getClientWithPayments", () => {
    let clientsBusiness: ClientsBusiness;
    let clientsDatabase: ClientsDatabase;
    beforeEach(() => {
        clientsDatabase = {
            register: jest.fn(),
        } as unknown as ClientsDatabase;

        clientsBusiness = new ClientsBusiness(clientsDatabase);
    });
  
    test("should throw an error when missing user ID", async () => {
      expect.assertions(1);
      try {
        await clientsBusiness.getClientWithPayments("");
      } catch (error:any) {
        expect(error.message).toBe("Missing ID");
      }
    });
  
    test("should return client with payments successfully", async () => {
        const mockClient: ClientsDTO = {
          id: "123",
          name: "John Doe",
          email: "johndoe@example.com",
          cpf: "12345678901",
        };
      
        const mockPayment: Payment = {
          id: "456",
          amount: 100,
          type:"credit_card",
          card_holder:"John Doe",
          card_number: "1234 5678 9012 3456",
          card_expiration_date:"07/2030",
          card_cvv:"132",
          client_id: "123",
        };
      
        const getClientWithPaymentsMock = jest.fn().mockImplementation(async (clientId: string) => {
          return {
            client: mockClient,
            payments: [mockPayment],
          };
        });
      
        clientsDatabase.getClientWithPayments = getClientWithPaymentsMock;
      
        const response = await clientsBusiness.getClientWithPayments("123");
      
        expect(response.client).toEqual(mockClient);
        expect(response.payments).toEqual([mockPayment]);
        expect(clientsDatabase.getClientWithPayments).toHaveBeenCalledWith("123");
        expect(getClientWithPaymentsMock).toHaveBeenCalledWith("123");
      });
  });

