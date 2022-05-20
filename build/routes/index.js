"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
// Initializing routes using express
const routes = express_1.default.Router();
// Using express static to serve images on the server
routes.use(express_1.default.static('assets'));
// Setting the end point to resize images
routes.get('/images', (req, res) => {
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
    else {
        const _finish = () => {
            // reading the image created using file system and opening it in the broswer
            fs_1.default.readFile(`./assets/thumb/${fileName}_thumb.jpg`, function (err, data) {
                if (err)
                    throw err; // Fail if the file can't be read.
                res.setHeader('Content-Type', 'image/jpeg'); // Set content type for the browser to know this is an image
                res.send(data); // Send the file data to the browser.
            });
        };
        // Using sharp to resize the image to the specified width and height
        (0, sharp_1.default)(`assets/full/${fileName}.jpg`)
            .resize(width, height)
            .toFile(`assets/thumb/${fileName}_thumb.jpg`)
            .then(_finish)
            .catch((err) => {
            res.send(err.message);
        });
    }
});
exports.default = routes;
