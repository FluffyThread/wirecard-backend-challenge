import { ClientsBusiness } from "../src/business/ClientsBusiness";
import { ClientsDatabase } from "../src/data/ClientsDatabase";


jest.mock('../src/data/ClientsDatabase', () => ({
    ClientsDatabase: jest.fn().mockImplementation(() => ({
      register: jest.fn(),
    })),
  }));

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

