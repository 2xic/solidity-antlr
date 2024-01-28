import { CharStream, CommonTokenStream } from "antlr4";
import SolidityLexer from "../antlr/generated/SolidityLexer";
import SolidityParser from "../antlr/generated/SolidityParser";
import ErrorListener from "./ErrorListener";
import { AstBuilder } from "./AstBuilder";

export function tokenize(input: string): any {
  const inputStream = new CharStream(input);
  const lexer = new SolidityLexer(inputStream);

  return lexer.getAllTokens();
}

export function parse(input: string) {
  const inputStream = new CharStream(input);
  const lexer = new SolidityLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new SolidityParser(tokenStream);
  const listener = new ErrorListener();
  lexer.removeErrorListeners();
  lexer.addErrorListener(listener);

  parser.removeErrorListeners();
  parser.addErrorListener(listener);
  parser.buildParseTrees = true;

  const sourceUnit = AstBuilder.fromSourceUnit(parser.sourceUnit());

  if (listener.hasErrors()) {
    return { success: false, errors: listener.getErrors() };
  } else {
    return { success: true, sourceUnit };
  }
}
