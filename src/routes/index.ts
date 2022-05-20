import express, { Router, Request, Response } from 'express';
import resize from './imageProcessing';

// Initializing routes using express
const routes: Router = express.Router();

// Using express static to serve images on the server
routes.use(express.static('assets'));

// Setting the end point to resize images
routes.get('/images', (req: Request, res: Response) => {
    const fileName: string = req.query.filename as string; // Taking the file name from url parameters
    const width: number = parseInt(req.query.width as string); // Taking the width from url parameters
    const height: number = parseInt(req.query.height as string); // Taking the height from url parameters

    if (height <= 0 || width <= 0){
        res.send('Please enter a positive number for height and width');
    }

    if (isNaN(height) || isNaN(width)){
        res.send('height and width must be positive integers');
    }

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
        resize(fileName, width, height, res);
    }
});

export default routes;
