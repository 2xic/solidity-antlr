/*
 * Tries to rebuild the AST in a similar way as the solc AST
 */

import { ParserRuleContext } from "antlr4";
import { IdentifierContext, SourceUnitContext } from "../antlr/generated/SolidityParser";

export class AstBuilder {
  static fromSourceUnit(sourceUnit: SourceUnitContext) {
    // console.log(sourceUnit);
    return Node.fromParserRule(sourceUnit);
  }
}

interface NodeDefinition {
  name?: string;
  type: string;
  children?: Node[];
}

/**
 * Most people write out all the node definitions, but that seems like a lot of work ...
 */
class Node {
  constructor(private state: NodeDefinition) {}

  static fromParserRule(rule: ParserRuleContext): Node | undefined {
    const type = rule.constructor.name.replace("Context", "");
  //  const name = (rule as { name?: stirng })._name;
    if (rule instanceof IdentifierContext){
   //     console.log(rule)
    }

    if (type === "Me") {
      // console.log(Object.keys(rule));
      // console.log(rule.parentCtx);
      // return undefined;
    }

    const children = rule.children
      ?.map((item) => {
        return Node.fromParserRule(item as ParserRuleContext);
      })
      .filter((item): item is Node => !!item);
    return new Node({
      type,
      children,
    });
  }

  public stringify(): NodeStringified {
    return {
      type: this.state.type,
      children: this.state.children?.map((item): NodeStringified => {
        return item.stringify();
      }),
    };
  }
}

type NodeStringified = {
  type: string;
  children?: NodeStringified[];
};
