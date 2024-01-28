#!/bin/bash

cd grammar && antlr4 -Dlanguage=TypeScript -o ../generated/ SolidityParser.g4 SolidityLexer.g4 
