// This is based off https://github.com/solidity-parser/parser/blob/05d78c0c1abf869049d70d39daf07656c667ad7a/src/ErrorListener.ts
import { ErrorListener as AntlrErrorListener } from "antlr4";

class ErrorListener extends AntlrErrorListener<any> {
  private _errors: any[];

  constructor() {
    super();

    this._errors = [];
  }

  syntaxError(
    recognizer: any,
    offendingSymbol: any,
    line: number,
    column: number,
    message: string
  ) {
    this._errors.push({ message, line, column });
  }

  getErrors(): any[] {
    return this._errors;
  }

  hasErrors() {
    return this._errors.length > 0;
  }
}

export default ErrorListener;
