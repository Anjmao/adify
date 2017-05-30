//export { UserModel } from '../../../../../server/src/model/user';
export type UserModel = {
    _id: string;
    email: string;
    displayName: string;
    photo?: string;
}
