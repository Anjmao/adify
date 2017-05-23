import { Document, Schema, model } from "mongoose";

export type AdModel = Document & {
    title: string,
    body: string,
};

const adSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Ad = model<AdModel>("Ad", adSchema);