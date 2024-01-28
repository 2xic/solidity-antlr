#!/bin/bash

cd grammar && antlr4 -Dlanguage=TypeScript -visitor -o ../generated/ SolidityParser.g4 SolidityLexer.g4 
