import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httreqest: HttpRequest): HttpResponse {
    const requiredFields = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    for (const field of requiredFields) {
      if (!httreqest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
