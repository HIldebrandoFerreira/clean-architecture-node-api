import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  handle(httReqest: HttpRequest): Promise<HttpResponse>;
}
