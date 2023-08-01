import mongoose from "mongoose";

const Schema = mongoose.Schema;

type IUser = {
    message: string;
    users: [],
    sender: any
}

const messageSchema = new Schema<IUser>({
    message: {
        text: {
            type: String,
            required: true,
        }
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export default mongoose.model<IUser>("Messages", messageSchema);
