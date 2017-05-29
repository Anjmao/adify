import { log } from 'util';
import { Request, Response, Router } from 'express'
import { AdModel, Ad } from '../model/ad';
import { AppRequest } from "../model/request";
import { publicRoute, secureRoute } from '../passport';

export interface ListAdsResponse {
    ads: AdModel[],
}

export const route = Router();
route.get('/ads', publicRoute(), queryAds);
route.get('/ads/:id', getAd);
route.post('/ads', secureRoute(), createAd);
route.put('/ads', secureRoute(), updateAd);
route.delete('/ads/:id', secureRoute(), deleteAd);

function queryAds(req: AppRequest, rsp: Response) {
    let query: any = {};
    const search = req.query['search'];
    const cuser = req.query['cuser'];
    if (search) {
        query.$text = { $search: search };
    }
    if (cuser) {
        query.userId = req.user.id;
    }
    console.log(query);
    Ad.find(query, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: 'textScore' } })
        .then(ads => {
            const result: ListAdsResponse = {
                ads: ads
            };
            rsp.json(result);
        }).catch(err => {
            rsp.json({ error: err });
        });
}

function getAd(req: Request, rsp: Response) {
    Ad.findById(req.params['id'], (err, ad) => {
        if (err) {
            rsp.status(500);
            return rsp.json(err);
        } else {
            if (ad) {
                return rsp.json(ad);
            } else {
                rsp.status(404);
                return rsp.json({ error: `ad ${req.params['id']} not found` });
            }
        }
    })
}

function createAd(req: AppRequest, rsp: Response) {
    const ad = new Ad(req.body);
    const user = req.user;
    ad.userId = user.id;
    console.log('user', user)
    ad.save((err, savedAd) => {
        if (err) {
            rsp.status(400);
            rsp.json(formatErrors(err.errors));
        } else {
            rsp.json(savedAd);
        }
    })
}

function updateAd(req: AppRequest, rsp: Response) {
    const adBody = <AdModel>req.body;
    const user = req['user'];
    Ad.findById(adBody._id, (err, ad) => {
        if (err) {
            rsp.status(400);
            return rsp.json(formatErrors(err));
        }

        if (ad.userId !== user.id) {
            rsp.status(400);
            return rsp.json({ error: `user is not allowed to update ad ${ad._id}` });
        }

        if (!ad) {
            rsp.status(404);
            return rsp.json({ error: `ad ${adBody._id} not found` });
        }

        ad.title = adBody.title;
        ad.content = adBody.content;
        ad.save((err2, savedJob) => {
            if (err2) {
                rsp.status(400);
                return rsp.json(formatErrors(err2.errors));
            } else {
                return rsp.json(savedJob);
            }
        });
    });
}

function deleteAd(req: AppRequest, rsp: Response, next) {
    const adId = req.params['id'];
    const userId = req.user.id;
    Ad.findById(adId, (err, ad) => {
        if (err) {
            rsp.status(500);
            return rsp.json(err);
        }

        if (!ad) {
            rsp.status(404);
            return rsp.json({ error: `ad ${adId} not found` });
        }

        if (!ad.canModify(userId)) {
            rsp.status(400);
            return rsp.json({ error: `user ${userId} is not allowed to delete ad ${adId}` });
        }

        ad.remove((err, ok) => {
            if (err) {
                rsp.status(500);
                return rsp.json({ error: err });
            }
            return rsp.sendStatus(200);
        });
    });
}

function formatErrors(errorsObject): any[] {
    const errorsList = [];
    for (let err in errorsObject) {
        errorsList.push({ message: errorsObject[err].message })
    }
    return errorsList;
}