import { Document, Schema, model } from "mongoose";

type UserLoginProvider = 'facebook' | 'linkedin' | 'google'

export type UserModel = Document & {
    uniqueId: string,
    displayName: string,
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
}, { timestamps: true });

export const User = model<UserModel>("User", userSchema);

export function createOrUpdateUser(profile: any): Promise<UserModel> {
    return new Promise((resolve, reject) => {
        User.findOne({ uniqueId: profile.id }, (err, user) => {
            if (user) {
                user.displayName = profile.displayName
            } else {
                user = new User({
                    uniqueId: profile.id,
                    displayName: profile.displayName,
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