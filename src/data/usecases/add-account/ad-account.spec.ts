import { DBAddAccount } from "./db-ad-account";

describe("DBAddAccount UseCase", () => {
  test("Should call Encrypter with correct password", async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("hashed_password"));
      }
    }
    const encrypterdStub = new EncrypterStub();
    const sut = new DBAddAccount(encrypterdStub);
    const encryptSpy = jest.spyOn(encrypterdStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
