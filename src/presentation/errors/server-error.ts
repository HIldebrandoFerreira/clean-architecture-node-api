export class ServerError extends Error {
  constructor() {
    super("Interner server error");
    this.name = "ServerError";
  }
}
