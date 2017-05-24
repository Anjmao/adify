import { Request, Response, Router } from 'express'
import { User } from '../model/user';
import { secureRoute } from '../passport';

export const route = Router();
route.get('/user', secureRoute(), getUser)
route.get('/user/logout', secureRoute(), logoutUser)

function getUser(req: Request, rsp: Response) {
    const usr = req['user']
    if (!usr) {
        rsp.status(400);
        return rsp.json({ error: `user is not logged in` });
    }

    User.findOne({ email: usr.email }, (err, user) => {
        if (!user) {
            rsp.status(404);
            return rsp.json({ error: `user ${usr.id} not found` });
        }

        rsp.json(user);
    });
}

function logoutUser(req: Request, rsp: Response) {
    (<any>req).logout();
    rsp.json({});
}
