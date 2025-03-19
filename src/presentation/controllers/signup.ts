import { MissingParamError } from "../errors/missing-param-error";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httreqest: HttpRequest): HttpResponse {
    if (!httreqest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError("name"),
      };
    }
    if (!httreqest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError("email"),
      };
    }
  }
}
