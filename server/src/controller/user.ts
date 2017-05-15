import { Request, Response, NextFunction } from 'express'
import { User } from "../model/user";

export function getUser(req: Request, rsp: Response, next: NextFunction) {
    let usr = req['user']
    if (!usr) {
        rsp.status(404)
        return rsp.json({ error: `user is not logged in` })
    }

    User.findOne({ id: usr.id }, (err, user) => {
        if (err) {
            return rsp.json({ error: `user ${usr.id} not found` })
        }

        rsp.json(user)
    })
}