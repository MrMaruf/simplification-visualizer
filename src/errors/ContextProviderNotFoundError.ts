import BaseError from "./BaseError";

class ContextProviderNotFoundError extends BaseError {
  constructor(provider: string = "provider", context: string = "context") {
    let message = `Context cannot be retrieved, ${context} can only be retrieved inside ${provider}`;
    super(message);
  }
}

export default ContextProviderNotFoundError;
