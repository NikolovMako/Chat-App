import { Request, Response, Router } from "express";
import { AbstractController } from "../AbstractController";
import User from "../models/user";
import { validateUser } from "../middleware/validate";
import jwt from 'jsonwebtoken'
import * as argon from 'argon2'

export default class LoginController extends AbstractController {
    path = "/login";
    router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(
            this.path,
            validateUser,
            this.login,
        );
    }
    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username })
        if (!user) return res.status(422).json({ message: 'User not found' })

        if (!(await argon.verify(user.password, password))) {
            return res.status(422).send({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ _id: user._id?.toString(), user: user.username }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '30 days',
        })

        try {
            return res.status(200).json({
                message: 'Logged in successfuly',
                username,
                token
            });
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Internal server error.\n\n${err}` });
        }
    }
}