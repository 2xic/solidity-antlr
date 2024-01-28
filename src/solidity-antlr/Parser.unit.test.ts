import assert from "assert/strict";
import { describe, it } from "node:test";
import { parse } from "./Parser";

describe("Parser", () => {
  it("should correctly reports syntax errors", () => {
    // Open issue https://github.com/solidity-parser/parser/issues/50
    const badSyntax = `
            contract Foo {

            contract Bar {}
        `;
    const results = parse(badSyntax);
    assert.equal(results.success, false);
    assert.ok(results.errors?.length);
  });

  it("should correctly reports valid syntax", () => {
    // Open issue https://github.com/solidity-parser/parser/issues/50
    const badSyntax = `
        contract Foo {
            function f(address payable) public {}
          }
        `;
    const results = parse(badSyntax);
    assert.equal(results.success, true);
  });
});
