"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
// Setting up the server using express
const app = (0, express_1.default)();
// Setting the port for the server to listen on
const port = process.env.PORT;
// Use middleware to connect routes to the app
app.use('/api', routes_1.default);
// Running the server on the specified port
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
exports.default = app;
