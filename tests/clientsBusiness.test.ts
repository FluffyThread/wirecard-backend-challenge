import { rejects } from "assert";
import { ClientsBusiness } from "../src/business/ClientsBusiness";
import { ClientsDatabase } from "../src/data/ClientsDatabase";
import { ClientsDTO } from "../src/models/ClientsDTO";
import { Payment } from "../src/models/PaymentDTO";
import { PaymentDatabase } from "../src/data/PaymentDatabase";


describe("register", () => {
    let clientsBusiness: ClientsBusiness;
    let clientsDatabase: ClientsDatabase;
    let paymentDatabase: PaymentDatabase
    beforeEach(() => {
        clientsDatabase = {
            register: jest.fn(),
        } as unknown as ClientsDatabase;

        clientsBusiness = new ClientsBusiness(clientsDatabase, paymentDatabase);
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
  let paymentDatabase: PaymentDatabase
  beforeEach(() => {
      clientsDatabase = {
          register: jest.fn(),
          getById:jest.fn()
      } as unknown as ClientsDatabase;

      paymentDatabase = {
        getPaymentByUserId:jest.fn()
      } as unknown as PaymentDatabase
      clientsBusiness = new ClientsBusiness(clientsDatabase, paymentDatabase );
  });
  
    test("should throw an error when missing user ID", async () => {
      expect.assertions(1);
      try {
        await clientsBusiness.getClientWithPayments("");
      } catch (error:any) {
        expect(error.message).toBe("Missing ID");
      }
    });
  
    test("Should throw an error if client doesn't exist", async () => {
      //arrange
      const id = "123";
      const getByIdMock = jest.fn().mockImplementation(async(id:string)=> {
        return undefined
      });
      clientsDatabase.getById = getByIdMock
      //act
      const clientsBusiness = new ClientsBusiness(clientsDatabase, paymentDatabase)

      // assert
      expect(clientsBusiness.getClientWithPayments(id)).rejects.toThrow("Client does not exist")
    })

    test("should return client with payments successfully", async () => {
      // arrange  
      const mockClient: ClientsDTO = {
          id: "1234",
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
          client_id: "1234",
        };
      
        const getClientWithPaymentsMock = jest.fn().mockImplementation(async (clientId: string) => {
          return {
            client: mockClient,
            payments: [mockPayment],
          };
        });

        const getByIdMock = jest.fn().mockImplementation(async(id:string) => {
          return mockClient
        })

        const getPaymentByUserIdMock = jest.fn().mockImplementation(async(id:string) => {
          return mockPayment
        })
        
      
        paymentDatabase.getPaymentByUserId = getPaymentByUserIdMock
        clientsDatabase.getById = getByIdMock
        clientsDatabase.getClientWithPayments = getClientWithPaymentsMock;
      
        // act
        const clientsBusiness = new ClientsBusiness(clientsDatabase, paymentDatabase)
        const response = await clientsBusiness.getClientWithPayments("1234");
      

        // assert
        expect(response.client).toEqual(mockClient);
        expect(response.payments).toEqual([mockPayment]);
        expect(clientsDatabase.getClientWithPayments).toHaveBeenCalledWith("1234");
        expect(getClientWithPaymentsMock).toHaveBeenCalledWith("1234");
      });

    
  });


  describe("Delete Client", () => {
    let clientsBusiness: ClientsBusiness;
    let clientsDatabase: ClientsDatabase;
    let paymentDatabase: PaymentDatabase
    beforeEach(() => {
        clientsDatabase = {
            register: jest.fn(),
            getById:jest.fn(),
            deleteClient:jest.fn()
        } as unknown as ClientsDatabase;

        paymentDatabase = {
          getPaymentByUserId:jest.fn()
        } as unknown as PaymentDatabase
        clientsBusiness = new ClientsBusiness(clientsDatabase, paymentDatabase );
    });
    test("Should delete a client", async () => {
        // Arrange
        const id = "123";
        const getByIdMock = jest.fn().mockImplementation(async(id:string)=> {
          return[{ id: "123", name: "John", email:"john@gmail.com", cpf:"123456789" }]
        });
        clientsDatabase.getById = getByIdMock
    
        // Act
        const response = await clientsBusiness.deleteClient(id);
    
        // Assert
        expect(response).toEqual({ status: "Client was successfully deleted!" });
      });
  
    test("Should throw an error if ID is missing", async () => {
      // Arrange
      const id = "";
  
      // Act and Assert
      await expect(clientsBusiness.deleteClient(id)).rejects.toThrow("Missing ID");
    });
  
    test("Should throw an error if client was not found", async () => {
      // Arrange
      const id = "123";
      const clientDatabase = new ClientsDatabase();
      const getByIdMock = jest.fn().mockImplementation(async(id:string) => {
        return undefined
      });
      clientDatabase.getById = getByIdMock;
      
      const clientsBusiness = new ClientsBusiness(clientDatabase, paymentDatabase);
  
      // Act and Assert
      await expect(clientsBusiness.deleteClient(id)).rejects.toThrow("No client was found");
    });
  });

