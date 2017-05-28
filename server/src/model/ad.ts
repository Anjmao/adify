import { Document, Schema, model } from 'mongoose';

export type AdModel = Document & {
    title: string,
    body: string,
};

const adSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true });

adSchema.index({ body: 'text', title: 'text' });

export const Ad = model<AdModel>('Ad', adSchema);
