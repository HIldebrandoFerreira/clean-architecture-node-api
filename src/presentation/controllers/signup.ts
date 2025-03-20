import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  handle(httReqest: HttpRequest): HttpResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    for (const field of requiredFields) {
      if (!httReqest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    const isValid = this.emailValidator.isValid(httReqest.body.email);
    if (!isValid) {
      return badRequest(new InvalidParamError("email"));
    }
  }
}
