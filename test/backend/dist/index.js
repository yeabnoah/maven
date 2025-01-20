"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.get("/", (req, res) => {
    res.status(201).json({
        message: "app running successfully",
        data: "this app is running hopefully",
    });
});
server.listen(3000, () => {
    console.log("server running in local host");
});
