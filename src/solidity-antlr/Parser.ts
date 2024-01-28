import { CharStream, CommonTokenStream, ParseTreeVisitor } from "antlr4";
import SolidityLexer from "../antlr/generated/SolidityLexer";
import SolidityParser from "../antlr/generated/SolidityParser";
import ErrorListener, { ErrorLocation } from "./ErrorListener";

export function parse(input: string): Results {
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

  new ParseTreeVisitor().visit(parser.sourceUnit());

  if (listener.hasErrors()) {
    const errors = listener.getErrors();
    errors.map((item) => {
      console.log(item);
      console.log(input.split("\n")[item.line - 1].slice(item.column));
    });
    return { success: false, errors };
  } else {
    return { success: true };
  }
}

type Results = { success: true } | { success: false; errors: ErrorLocation[] };
