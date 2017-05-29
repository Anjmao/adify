import { Document, Schema, model } from 'mongoose';

export type AdModel = Document & {
    title: string,
    content: string,
    userId: string,
    canModify: (userId: string) => boolean,
};

const adSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

adSchema.index(
    {
        body: 'text',
        title: 'text'
    },
    {
        weights: {
            body: 10,
            title: 5
        }
    });

adSchema.methods.canModify = function (userId: string): boolean {
    return this.userId === userId;
}

export const Ad = model<AdModel>('Ad', adSchema);
