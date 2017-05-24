import { Document, Schema, model } from 'mongoose';

export type UserModel = Document & {
    displayName: string,
    email: string,
    photo: string,
};

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    }
}, { timestamps: true });

export const User = model<UserModel>('User', userSchema);

export function createOrUpdateUser(profile: any): Promise<UserModel> {
    return new Promise((resolve, reject) => {
        if (!profile.emails || profile.emails.length === 0) {
            reject('user should provide email address');
            return;
        }
        const email = profile.emails[0].value;
        let photo = null;
        if (profile.photos && profile.photos.length > 0) {
            photo = profile.photos[0].value
        }
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            if (user) {
                user.displayName = profile.displayName;
                user.photo = photo;
            } else {
                user = new User({
                    displayName: profile.displayName,
                    email: email,
                    photo: photo,
                });
            }

            user.save((err2, product) => {
                if (err2) {
                    reject(err2);
                } else {
                    resolve(product);
                }
            });
        });
    });
}
