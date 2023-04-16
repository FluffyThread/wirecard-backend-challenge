import { rejects } from "assert";
import { ClientsBusiness } from "../src/business/ClientsBusiness";
import { ClientsDatabase } from "../src/data/ClientsDatabase";
import { ClientsDTO } from "../src/models/ClientsDTO";
import { Payment } from "../src/models/PaymentDTO";
import { PaymentDatabase } from "../src/data/PaymentDatabase";


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
          getById:jest.fn()
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
  
    test("Should throw an error if client doesn't exist", async () => {
      //arrange
      const id = "123";
      const getByIdMock = jest.fn().mockImplementation(async(id:string)=> {
        return undefined
      });
      clientsDatabase.getById = getByIdMock
      //act
      const clientsBusiness = new ClientsBusiness(clientsDatabase)

      // assert
      expect(clientsBusiness.getClientWithPayments(id)).rejects.toThrow("Client does not exist")
    })

    
  });


  describe("Delete Client", () => {
    let clientsBusiness: ClientsBusiness;
    let clientsDatabase: ClientsDatabase;
    beforeEach(() => {
        clientsDatabase = {
            register: jest.fn(),
            getById:jest.fn(),
            deleteClient:jest.fn()
        } as unknown as ClientsDatabase;

        clientsBusiness = new ClientsBusiness(clientsDatabase);
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
      
      const clientsBusiness = new ClientsBusiness(clientDatabase);
  
      // Act and Assert
      await expect(clientsBusiness.deleteClient(id)).rejects.toThrow("No client was found");
    });
  });

