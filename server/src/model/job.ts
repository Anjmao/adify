import { Document, Schema, model } from "mongoose";

export type JobModel = Document & {
    title: string,
    body: string,
};

const userSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

//export const User: UserType = mongoose.model<UserType>('User', userSchema);
export const Job = model<JobModel>("Job", userSchema);