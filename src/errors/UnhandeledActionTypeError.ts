import BaseError from "./BaseError";

class UnhandledActionTypeError extends BaseError {
  constructor(action: object) {
    let message;
    try {
      const actionJSON = JSON.stringify(action);
      message = `Unhandled action type. Passed action object: ${actionJSON}`;
    } catch (Error) {
      message = `Unhandled action type. Passed action object cannot be stringified`;
    } finally {
      super(message);
    }
  }
}

export default UnhandledActionTypeError;
