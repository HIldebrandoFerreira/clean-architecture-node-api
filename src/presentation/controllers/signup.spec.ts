import { SignUpController } from "./signup";

describe("SignUpController", () => {
  test("returns 400 if no name is provided", async () => {
    const sut = new SignUpController();

    const httreqest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httreqest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });
  test("returns 400 if no email is provided", async () => {
    const sut = new SignUpController();

    const httreqest = {
      body: {
        name: "any-name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httreqest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: email"));
  });
});
