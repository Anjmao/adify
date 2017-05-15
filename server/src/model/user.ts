import { Document, Schema, model } from "mongoose";

export type UserModel = Document & {
    uniqueId: string,
    displayName: string,
    token: string,
};

const userSchema = new Schema({
    uniqueId: {
        type: String,
        unique: true,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = model<UserModel>("User", userSchema);

export function createOrUpdateUser(profile, token: string, doneCallback, errorCallback) {
    User.findOne({ uniqueId: profile.id }, (err, user) => {
        if (err) {
            user = new User({
                uniqueId: profile.id,
                displayName: profile.displayName,
                token: token,
            })
        } else {
            user.displayName = profile.displayName
            user.token = token
        }

        user.save((err, product) => {
            if (err) {
                errorCallback(err)
            } else {
                doneCallback(product)
            }
        })
    })
}