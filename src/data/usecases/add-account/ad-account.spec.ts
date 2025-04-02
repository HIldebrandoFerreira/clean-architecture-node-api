import { Encrypter } from "../../protocols/encrypter";
import { DBAddAccount } from "./db-ad-account";

interface SutTypes {
  sut: DBAddAccount;
  encrypterdStub: Encrypter;
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};
const makeSut = (): SutTypes => {
  const encrypterdStub = makeEncrypterStub();
  const sut = new DBAddAccount(encrypterdStub);
  return { sut, encrypterdStub };
};

describe("DBAddAccount UseCase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterdStub } = makeSut();
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
