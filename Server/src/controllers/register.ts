import { Request, Response, Router } from "express";
import { AbstractController } from "../AbstractController";
import User from "../models/user";
import * as argon from "argon2";
import { validateUser } from "../middleware/validate";

export default class RegisterController extends AbstractController {
    path = "/register";
    router = Router();

    constructor() {
        super();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(
            this.path,
            validateUser,
            this.register,
        );
    }
    async register(req: Request, res: Response) {
        const { username, password } = req.body;
        if (await User.findOne({ username: username })) return res.status(422).send({ message: 'Username already exists' })

        const hash = await argon.hash(password);
        try {
            const user = new User({
                username,
                password: hash,
            });
            user.save()
            return res.status(200).json({
                message: 'User created succesfully',
                username,
            });
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Internal server error.\n\n${err}` });
        }
    }
}