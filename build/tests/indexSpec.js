"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('check response status code when given full url with parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=200&height=300');
        expect(response.statusCode).toEqual(200);
    }));
    it('check it dislplaye Error: Input file missing when given url without filename parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?width=200&height=300');
        expect(response.text).toBe('Error: Input file missing');
    }));
    it('check it dislplaye Error: width missing when given url without width parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&height=300');
        expect(response.text).toBe('Error: Width missing');
    }));
    it('check it dislplaye Error: Height missing when given url without height parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=200');
        expect(response.text).toBe('Error: Height missing');
    }));
    it('check it dislplaye Error: Input file is missing: assets/full/jord.jpg when given wrong file name', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=jord&width=200&height=300');
        console.log(response.text);
        expect(response.text).toBe('Input file is missing: assets/full/jord.jpg');
    }));
});
