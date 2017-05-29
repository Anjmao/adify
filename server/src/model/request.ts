import { Request } from 'express';
export type AppRequest = Request & {
    user: {
        id: string,
        email: string,
    },
}