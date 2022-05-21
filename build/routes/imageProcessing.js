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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resize = (fileName, width, height, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _finish = () => {
        // reading the image created using file system and opening it in the broswer
        fs_1.default.readFile(`./assets/thumb/${fileName}_thumb_${height}x${width}.jpg`, function (err, data) {
            if (err)
                throw err; // Fail if the file can't be read.
            res.setHeader('Content-Type', 'image/jpeg'); // Set content type for the browser to know this is an image
            res.send(data); // Send the file data to the browser.
        });
    };
    // Using sharp to resize the image to the specified width and height
    (0, sharp_1.default)(`assets/full/${fileName}.jpg`)
        .resize(width, height)
        .toFile(`assets/thumb/${fileName}_thumb_${height}x${width}.jpg`)
        .then(_finish)
        .catch((err) => {
        res.send(err.message);
    });
});
exports.default = resize;
