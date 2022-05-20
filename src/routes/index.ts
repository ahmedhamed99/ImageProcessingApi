import express, { Router, Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';

// Initializing routes using express
const routes: Router = express.Router();

// Using express static to serve images on the server
routes.use(express.static('assets'));

// Setting the end point to resize images
routes.get('/images', (req: Request, res: Response) => {
    const fileName: string = req.query.filename as string; // Taking the file name from url parameters
    const width: number = parseInt(req.query.width as string); // Taking the width from url parameters
    const height: number = parseInt(req.query.height as string); // Taking the height from url parameters

    if (!fileName) {
        // checking if the file name has been given
        res.send('Error: Input file missing');
    } else if (!width) {
        // checking if the width has been given
        res.send('Error: Width missing');
    } else if (!height) {
        // checking if the height has been given
        res.send('Error: Height missing');
    } else {
        const _finish = (): void => {
            // reading the image created using file system and opening it in the broswer
            fs.readFile(
                `./assets/thumb/${fileName}_thumb.jpg`,
                function (err, data) {
                    if (err) throw err; // Fail if the file can't be read.
                    res.setHeader('Content-Type', 'image/jpeg'); // Set content type for the browser to know this is an image
                    res.send(data); // Send the file data to the browser.
                }
            );
        };
        // Using sharp to resize the image to the specified width and height
        sharp(`assets/full/${fileName}.jpg`)
            .resize(width, height)
            .toFile(`assets/thumb/${fileName}_thumb.jpg`)
            .then(_finish)
            .catch((err: Error) => {
                res.send(err.message);
            });
    }
});

export default routes;
