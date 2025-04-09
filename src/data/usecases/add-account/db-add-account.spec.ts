import { accountData } from "../../../presentation/utils/mocks/Account";
import { DBAddAccount } from "./db-add-account";
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-add-account-protocols";

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};
const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = { id: "valid_id", ...accountData };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositoryStub();
};
interface SutTypes {
  sut: DBAddAccount;
  encrypterdStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}
const makeSut = (): SutTypes => {
  const encrypterdStub = makeEncrypterStub();
  const addAccountRepositoryStub = makeAddAccountRepositoryStub();
  const sut = new DBAddAccount(encrypterdStub, addAccountRepositoryStub);
  return { sut, encrypterdStub, addAccountRepositoryStub };
};

describe("DBAddAccount UseCase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterdStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterdStub, "encrypt");
    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterdStub } = makeSut();
    jest
      .spyOn(encrypterdStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promisse = sut.add(accountData);
    await expect(promisse).rejects.toThrow();
  });

  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });

  test("Should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promisse = sut.add(accountData);
    await expect(promisse).rejects.toThrow();
  });

  test("Should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(accountData);
    await expect(account).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });
});
