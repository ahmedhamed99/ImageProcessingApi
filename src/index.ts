import dotenv from 'dotenv';
import express, { Express } from 'express';
import routes from './routes';

dotenv.config();

// Setting up the server using express
const app: Express = express();

// Setting the port for the server to listen on
const port = process.env.PORT;

// Use middleware to connect routes to the app
app.use('/api', routes);

// Running the server on the specified port
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
    
export default app;
