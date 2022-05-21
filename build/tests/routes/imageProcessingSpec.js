"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcessing_1 = __importDefault(require("../../routes/imageProcessing"));
const index_1 = __importDefault(require("../../index"));
describe('Testing the resizing function', () => {
    it('expects the fucntion to create a new image with the resized width and height', () => {
        const response = index_1.default.get('/api/images?filename=fjord&width=200&height=300');
        const result = (0, imageProcessing_1.default)('fjord', 200, 300, response);
        expect(result).not.toBeFalsy();
    });
});
