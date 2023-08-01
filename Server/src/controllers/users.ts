import { NextFunction, Request, Response, Router } from "express";
import { AbstractController } from "../AbstractController";
import User from "../models/user";
import Message from "../models/messages";

export default class UsersController extends AbstractController {
    path = "/users";
    router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(
            this.path,
            this.getUsers,
        );
        this.router.post(
            `${this.path}/message`,
            this.postMessage,
        );
        this.router.post(
            `${this.path}/messages`,
            this.getMessages,
        );
    }
    async getUsers(req: Request, res: Response) {
        const users = await User.find({}, '_id username')
        if (req) {
            return res.status(200).json({
                message: 'succesfully fetched users',
                users
            })
        } else {
            return res.status(500).json({
                message: 'internal server error',
            })
        }
    }
    async postMessage(req: Request, res: Response, next: NextFunction) {
        try {

            const { message, to, sender } = req.body
            const newMessage = await Message.create({
                message: { text: message },
                users: [sender, to],
                sender: sender
            })
            if (newMessage) return res.status(200).json({ msg: 'Message added successfully.' })
            return res.status(404).json({ msg: 'failed to add message to the db' })
        } catch (Err) {
            next(Err)
        }
    }
    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const { to, sender } = req.body
            const messages = await Message.find({
                users: {
                    $all: [sender, to]
                },
            })
                .sort({ updatedAt: 1 })
            const projectMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === sender,
                    // @ts-expect-error text
                    message: msg.message.text,
                    // @ts-expect-error text
                    createdAt: msg?.createdAt
                }
            })
            res.json(projectMessages)
        } catch (Err) {
            next(Err)
        }
    }
}