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
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = __importDefault(require("./imageProcessing"));
// Initializing routes using express
const routes = express_1.default.Router();
// Using express static to serve images on the server
routes.use(express_1.default.static('assets'));
// Setting the end point to resize images
routes.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.filename; // Taking the file name from url parameters
    const width = parseInt(req.query.width); // Taking the width from url parameters
    const height = parseInt(req.query.height); // Taking the height from url parameters
    if (!fileName) {
        // checking if the file name has been given
        res.send('Error: Input file missing');
    }
    else if (!width) {
        // checking if the width has been given
        res.send('Error: Width missing');
    }
    else if (!height) {
        // checking if the height has been given
        res.send('Error: Height missing');
    }
    else if (height <= 0 || width <= 0) {
        res.send('Please enter a positive number for height and width');
    }
    else if (isNaN(height) || isNaN(width)) {
        res.send('height and width must be positive integers');
    }
    else {
        (0, imageProcessing_1.default)(fileName, width, height, res);
    }
}));
exports.default = routes;
