import fs from 'fs';
import sharp from 'sharp';
import express from 'express';

const resize = (fileName: string, width: number, height: number, res: express.Response): void => {
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
};

export default resize;