import { Document, Schema, model } from "mongoose";

type UserLoginProvider = 'facebook' | 'linkedin' | 'google'

export type UserModel = Document & {
    uniqueId: string,
    displayName: string,
    token: string,
    provider: UserLoginProvider,
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
    provider: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const User = model<UserModel>("User", userSchema);

export function createOrUpdateUser(profile: any, token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        User.findOne({ uniqueId: profile.id }, (err, user) => {
            if (user) {
                user.displayName = profile.displayName
                user.token = token
            } else {
                user = new User({
                    uniqueId: profile.id,
                    displayName: profile.displayName,
                    token: token,
                    provider: profile.provider,
                })
            }

            user.save((err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    })
}