import mongoose from "mongoose";

const Schema = mongoose.Schema;

type IUser = {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IUser>("User", userSchema);


