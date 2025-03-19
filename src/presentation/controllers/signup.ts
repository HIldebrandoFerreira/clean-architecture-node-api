import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
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
  }
}
