import { SignUpController } from "./signup";

describe("SignUpController", () => {
  test("returns 400 if no name is provided", async () => {
    const sut = new SignUpController();

    const httreqest = {
      body: {
        name: "any-name",
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httreqest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test("should ", async () => {});
});
