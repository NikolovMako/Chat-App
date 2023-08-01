import express, { Application } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { AbstractController } from "./AbstractController";
import mongoose from "mongoose";
import { Server } from "socket.io";
export default class App {
    app: Application;
    port: number;

    constructor(controllers: Array<AbstractController>, port: number) {
        this.app = express();
        this.port = port;
        this.dbConnect();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
    }
    initializeMiddleware() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    initializeControllers(controllers: Array<AbstractController>) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    public listen() {
        const server = this.app.listen(this.port, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        });
        const io = new Server(server, {
            cors: {
                origin: `http://localhost:3000`,
                credentials: true
            }
        })
        io.sockets.on('connection', (socket) => {
            socket.on('send-msg', (data) => {
                if (data) {
                    socket.broadcast.emit('msg-receive', data)
                }
            })
        });
    }
    public dbConnect() {
        mongoose.connect(process.env.MONGO_URI!)
    }
}
