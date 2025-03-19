export class SignUpController {
  handle(httreqest: any): any {
    if (!httreqest.body.name) {
      return {
        statusCode: 400,
        body: new Error("Missing param: name"),
      };
    }
    if (!httreqest.body.email) {
      return {
        statusCode: 400,
        body: new Error("Missing param: email"),
      };
    }
  }
}
