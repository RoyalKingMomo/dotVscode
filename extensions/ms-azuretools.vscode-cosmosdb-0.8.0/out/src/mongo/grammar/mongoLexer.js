"use strict";
// Generated from ./grammar/mongo.g4 by ANTLR 4.6-SNAPSHOT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Lexer_1 = require("antlr4ts/Lexer");
const LexerATNSimulator_1 = require("antlr4ts/atn/LexerATNSimulator");
const Decorators_1 = require("antlr4ts/Decorators");
const Decorators_2 = require("antlr4ts/Decorators");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = require("antlr4ts/misc/Utils");
class mongoLexer extends Lexer_1.Lexer {
    constructor(input) {
        super(input);
        this._interp = new LexerATNSimulator_1.LexerATNSimulator(mongoLexer._ATN, this);
    }
    get vocabulary() {
        return mongoLexer.VOCABULARY;
    }
    isExternalIdentifierText(text) {
        return text === 'db';
    }
    get grammarFileName() { return "mongo.g4"; }
    get ruleNames() { return mongoLexer.ruleNames; }
    get serializedATN() { return mongoLexer._serializedATN; }
    get modeNames() { return mongoLexer.modeNames; }
    sempred(_localctx, ruleIndex, predIndex) {
        switch (ruleIndex) {
            case 19:
                return this.IDENTIFIER_sempred(_localctx, predIndex);
        }
        return true;
    }
    IDENTIFIER_sempred(_localctx, predIndex) {
        switch (predIndex) {
            case 0:
                return !this.isExternalIdentifierText(this.text);
        }
        return true;
    }
    static get _ATN() {
        if (!mongoLexer.__ATN) {
            mongoLexer.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(mongoLexer._serializedATN));
        }
        return mongoLexer.__ATN;
    }
}
mongoLexer.T__0 = 1;
mongoLexer.T__1 = 2;
mongoLexer.T__2 = 3;
mongoLexer.T__3 = 4;
mongoLexer.T__4 = 5;
mongoLexer.T__5 = 6;
mongoLexer.T__6 = 7;
mongoLexer.T__7 = 8;
mongoLexer.SingleLineComment = 9;
mongoLexer.MultiLineComment = 10;
mongoLexer.StringLiteral = 11;
mongoLexer.NullLiteral = 12;
mongoLexer.BooleanLiteral = 13;
mongoLexer.NumericLiteral = 14;
mongoLexer.DecimalLiteral = 15;
mongoLexer.LineTerminator = 16;
mongoLexer.SEMICOLON = 17;
mongoLexer.DOT = 18;
mongoLexer.DB = 19;
mongoLexer.IDENTIFIER = 20;
mongoLexer.DOUBLE_QUOTED_STRING_LITERAL = 21;
mongoLexer.SINGLE_QUOTED_STRING_LITERAL = 22;
mongoLexer.WHITESPACE = 23;
mongoLexer.modeNames = [
    "DEFAULT_MODE"
];
mongoLexer.ruleNames = [
    "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "SingleLineComment",
    "MultiLineComment", "StringLiteral", "NullLiteral", "BooleanLiteral",
    "NumericLiteral", "DecimalLiteral", "LineTerminator", "SEMICOLON", "DOT",
    "DB", "IDENTIFIER", "DOUBLE_QUOTED_STRING_LITERAL", "SINGLE_QUOTED_STRING_LITERAL",
    "STRING_ESCAPE", "DecimalIntegerLiteral", "ExponentPart", "DecimalDigit",
    "WHITESPACE"
];
mongoLexer._LITERAL_NAMES = [
    undefined, "'('", "','", "')'", "'{'", "'}'", "'['", "']'", "':'", undefined,
    undefined, undefined, "'null'", undefined, undefined, undefined, undefined,
    "';'", "'.'", "'db'"
];
mongoLexer._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, "SingleLineComment", "MultiLineComment", "StringLiteral",
    "NullLiteral", "BooleanLiteral", "NumericLiteral", "DecimalLiteral", "LineTerminator",
    "SEMICOLON", "DOT", "DB", "IDENTIFIER", "DOUBLE_QUOTED_STRING_LITERAL",
    "SINGLE_QUOTED_STRING_LITERAL", "WHITESPACE"
];
mongoLexer.VOCABULARY = new VocabularyImpl_1.VocabularyImpl(mongoLexer._LITERAL_NAMES, mongoLexer._SYMBOLIC_NAMES, []);
mongoLexer._serializedATN = "\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02\x19\xD7\b\x01" +
    "\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
    "\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
    "\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
    "\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
    "\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
    "\x1C\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03" +
    "\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\n" +
    "\x03\n\x07\nN\n\n\f\n\x0E\nQ\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x07" +
    "\vY\n\v\f\v\x0E\v\\\v\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f\x05" +
    "\fe\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
    "\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0Eu\n\x0E\x03\x0F\x05\x0F" +
    "x\n\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x06\x10\x7F\n\x10\r\x10" +
    "\x0E\x10\x80\x03\x10\x05\x10\x84\n\x10\x03\x10\x03\x10\x06\x10\x88\n\x10" +
    "\r\x10\x0E\x10\x89\x03\x10\x05\x10\x8D\n\x10\x03\x10\x03\x10\x05\x10\x91" +
    "\n\x10\x05\x10\x93\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12" +
    "\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x06\x15\xA2\n" +
    "\x15\r\x15\x0E\x15\xA3\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x07\x16" +
    "\xAB\n\x16\f\x16\x0E\x16\xAE\v\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03" +
    "\x17\x07\x17\xB5\n\x17\f\x17\x0E\x17\xB8\v\x17\x03\x17\x03\x17\x03\x18" +
    "\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x07\x19\xC2\n\x19\f\x19\x0E\x19" +
    "\xC5\v\x19\x05\x19\xC7\n\x19\x03\x1A\x03\x1A\x05\x1A\xCB\n\x1A\x03\x1A" +
    "\x06\x1A\xCE\n\x1A\r\x1A\x0E\x1A\xCF\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03" +
    "\x1C\x03\x1C\x03Z\x02\x02\x1D\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02" +
    "\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02" +
    "\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13%" +
    "\x02\x14\'\x02\x15)\x02\x16+\x02\x17-\x02\x18/\x02\x021\x02\x023\x02\x02" +
    "5\x02\x027\x02\x19\x03\x02\f\x05\x02\f\f\x0F\x0F\u202A\u202B\f\x02\v\f" +
    "\x0F\x0F\"\"$$)+.0<=]_}}\x7F\x7F\x04\x02$$^^\x04\x02))^^\x05\x02$$))^" +
    "^\x03\x023;\x04\x02GGgg\x04\x02--//\x03\x022;\x04\x02\v\v\"\"\xE8\x02" +
    "\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02" +
    "\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F" +
    "\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15" +
    "\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B" +
    "\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!" +
    "\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02\'\x03\x02" +
    "\x02\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02\x02\x02-\x03\x02\x02\x02" +
    "\x027\x03\x02\x02\x02\x039\x03\x02\x02\x02\x05;\x03\x02\x02\x02\x07=\x03" +
    "\x02\x02\x02\t?\x03\x02\x02\x02\vA\x03\x02\x02\x02\rC\x03\x02\x02\x02" +
    "\x0FE\x03\x02\x02\x02\x11G\x03\x02\x02\x02\x13I\x03\x02\x02\x02\x15T\x03" +
    "\x02\x02\x02\x17d\x03\x02\x02\x02\x19f\x03\x02\x02\x02\x1Bt\x03\x02\x02" +
    "\x02\x1Dw\x03\x02\x02\x02\x1F\x92\x03\x02\x02\x02!\x94\x03\x02\x02\x02" +
    "#\x98\x03\x02\x02\x02%\x9A\x03\x02\x02\x02\'\x9C\x03\x02\x02\x02)\xA1" +
    "\x03\x02\x02\x02+\xA7\x03\x02\x02\x02-\xB1\x03\x02\x02\x02/\xBB\x03\x02" +
    "\x02\x021\xC6\x03\x02\x02\x023\xC8\x03\x02\x02\x025\xD1\x03\x02\x02\x02" +
    "7\xD3\x03\x02\x02\x029:\x07*\x02\x02:\x04\x03\x02\x02\x02;<\x07.\x02\x02" +
    "<\x06\x03\x02\x02\x02=>\x07+\x02\x02>\b\x03\x02\x02\x02?@\x07}\x02\x02" +
    "@\n\x03\x02\x02\x02AB\x07\x7F\x02\x02B\f\x03\x02\x02\x02CD\x07]\x02\x02" +
    "D\x0E\x03\x02\x02\x02EF\x07_\x02\x02F\x10\x03\x02\x02\x02GH\x07<\x02\x02" +
    "H\x12\x03\x02\x02\x02IJ\x071\x02\x02JK\x071\x02\x02KO\x03\x02\x02\x02" +
    "LN\n\x02\x02\x02ML\x03\x02\x02\x02NQ\x03\x02\x02\x02OM\x03\x02\x02\x02" +
    "OP\x03\x02\x02\x02PR\x03\x02\x02\x02QO\x03\x02\x02\x02RS\b\n\x02\x02S" +
    "\x14\x03\x02\x02\x02TU\x071\x02\x02UV\x07,\x02\x02VZ\x03\x02\x02\x02W" +
    "Y\v\x02\x02\x02XW\x03\x02\x02\x02Y\\\x03\x02\x02\x02Z[\x03\x02\x02\x02" +
    "ZX\x03\x02\x02\x02[]\x03\x02\x02\x02\\Z\x03\x02\x02\x02]^\x07,\x02\x02" +
    "^_\x071\x02\x02_`\x03\x02\x02\x02`a\b\v\x02\x02a\x16\x03\x02\x02\x02b" +
    "e\x05-\x17\x02ce\x05+\x16\x02db\x03\x02\x02\x02dc\x03\x02\x02\x02e\x18" +
    "\x03\x02\x02\x02fg\x07p\x02\x02gh\x07w\x02\x02hi\x07n\x02\x02ij\x07n\x02" +
    "\x02j\x1A\x03\x02\x02\x02kl\x07v\x02\x02lm\x07t\x02\x02mn\x07w\x02\x02" +
    "nu\x07g\x02\x02op\x07h\x02\x02pq\x07c\x02\x02qr\x07n\x02\x02rs\x07u\x02" +
    "\x02su\x07g\x02\x02tk\x03\x02\x02\x02to\x03\x02\x02\x02u\x1C\x03\x02\x02" +
    "\x02vx\x07/\x02\x02wv\x03\x02\x02\x02wx\x03\x02\x02\x02xy\x03\x02\x02" +
    "\x02yz\x05\x1F\x10\x02z\x1E\x03\x02\x02\x02{|\x051\x19\x02|~\x070\x02" +
    "\x02}\x7F\x055\x1B\x02~}\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80~" +
    "\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81\x83\x03\x02\x02\x02\x82\x84" +
    "\x053\x1A\x02\x83\x82\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x93" +
    "\x03\x02\x02\x02\x85\x87\x070\x02\x02\x86\x88\x055\x1B\x02\x87\x86\x03" +
    "\x02\x02\x02\x88\x89\x03\x02\x02\x02\x89\x87\x03\x02\x02\x02\x89\x8A\x03" +
    "\x02\x02\x02\x8A\x8C\x03\x02\x02\x02\x8B\x8D\x053\x1A\x02\x8C\x8B\x03" +
    "\x02\x02\x02\x8C\x8D\x03\x02\x02\x02\x8D\x93\x03\x02\x02\x02\x8E\x90\x05" +
    "1\x19\x02\x8F\x91\x053\x1A\x02\x90\x8F\x03\x02\x02\x02\x90\x91\x03\x02" +
    "\x02\x02\x91\x93\x03\x02\x02\x02\x92{\x03\x02\x02\x02\x92\x85\x03\x02" +
    "\x02\x02\x92\x8E\x03\x02\x02\x02\x93 \x03\x02\x02\x02\x94\x95\t\x02\x02" +
    "\x02\x95\x96\x03\x02\x02\x02\x96\x97\b\x11\x02\x02\x97\"\x03\x02\x02\x02" +
    "\x98\x99\x07=\x02\x02\x99$\x03\x02\x02\x02\x9A\x9B\x070\x02\x02\x9B&\x03" +
    "\x02\x02\x02\x9C\x9D\x07f\x02\x02\x9D\x9E\x07d\x02\x02\x9E(\x03\x02\x02" +
    "\x02\x9F\xA2\n\x03\x02\x02\xA0\xA2\x05/\x18\x02\xA1\x9F\x03\x02\x02\x02" +
    "\xA1\xA0\x03\x02\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02" +
    "\xA3\xA4\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA6\x06\x15\x02\x02" +
    "\xA6*\x03\x02\x02\x02\xA7\xAC\x07$\x02\x02\xA8\xAB\n\x04\x02\x02\xA9\xAB" +
    "\x05/\x18\x02\xAA\xA8\x03\x02\x02\x02\xAA\xA9\x03\x02\x02\x02\xAB\xAE" +
    "\x03\x02\x02\x02\xAC\xAA\x03\x02\x02\x02\xAC\xAD\x03\x02\x02\x02\xAD\xAF" +
    "\x03\x02\x02\x02\xAE\xAC\x03\x02\x02\x02\xAF\xB0\x07$\x02\x02\xB0,\x03" +
    "\x02\x02\x02\xB1\xB6\x07)\x02\x02\xB2\xB5\n\x05\x02\x02\xB3\xB5\x05/\x18" +
    "\x02\xB4\xB2\x03\x02\x02\x02\xB4\xB3\x03\x02\x02\x02\xB5\xB8\x03\x02\x02" +
    "\x02\xB6\xB4\x03\x02\x02\x02\xB6\xB7\x03\x02\x02\x02\xB7\xB9\x03\x02\x02" +
    "\x02\xB8\xB6\x03\x02\x02\x02\xB9\xBA\x07)\x02\x02\xBA.\x03\x02\x02\x02" +
    "\xBB\xBC\x07^\x02\x02\xBC\xBD\t\x06\x02\x02\xBD0\x03\x02\x02\x02\xBE\xC7" +
    "\x072\x02\x02\xBF\xC3\t\x07\x02\x02\xC0\xC2\x055\x1B\x02\xC1\xC0\x03\x02" +
    "\x02\x02\xC2\xC5\x03\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC3\xC4\x03\x02" +
    "\x02\x02\xC4\xC7\x03\x02\x02\x02\xC5\xC3\x03\x02\x02\x02\xC6\xBE\x03\x02" +
    "\x02\x02\xC6\xBF\x03\x02\x02\x02\xC72\x03\x02\x02\x02\xC8\xCA\t\b\x02" +
    "\x02\xC9\xCB\t\t\x02\x02\xCA\xC9\x03\x02\x02\x02\xCA\xCB\x03\x02\x02\x02" +
    "\xCB\xCD\x03\x02\x02\x02\xCC\xCE\x055\x1B\x02\xCD\xCC\x03\x02\x02\x02" +
    "\xCE\xCF\x03\x02\x02\x02\xCF\xCD\x03\x02\x02\x02\xCF\xD0\x03\x02\x02\x02" +
    "\xD04\x03\x02\x02\x02\xD1\xD2\t\n\x02\x02\xD26\x03\x02\x02\x02\xD3\xD4" +
    "\t\v\x02\x02\xD4\xD5\x03\x02\x02\x02\xD5\xD6\b\x1C\x03\x02\xD68\x03\x02" +
    "\x02\x02\x18\x02OZdtw\x80\x83\x89\x8C\x90\x92\xA1\xA3\xAA\xAC\xB4\xB6" +
    "\xC3\xC6\xCA\xCF\x04\x02\x03\x02\b\x02\x02";
__decorate([
    Decorators_2.Override,
    Decorators_1.NotNull
], mongoLexer.prototype, "vocabulary", null);
__decorate([
    Decorators_2.Override
], mongoLexer.prototype, "grammarFileName", null);
__decorate([
    Decorators_2.Override
], mongoLexer.prototype, "ruleNames", null);
__decorate([
    Decorators_2.Override
], mongoLexer.prototype, "serializedATN", null);
__decorate([
    Decorators_2.Override
], mongoLexer.prototype, "modeNames", null);
__decorate([
    Decorators_2.Override
], mongoLexer.prototype, "sempred", null);
exports.mongoLexer = mongoLexer;
//# sourceMappingURL=mongoLexer.js.map