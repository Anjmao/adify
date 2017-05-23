import { Request, Response, Router } from 'express'
import { AdModel, Ad } from "../model/ad";

export interface ListAdsResponse {
    ads: AdModel[]
}

export const routes = Router();
routes.get('/ads', listAds);
routes.get('/ads/:id', getAd);
routes.post('/ads', createAd);
routes.put('/ads', updateAd);

function listAds(req: Request, rsp: Response) {
    Ad.find().then(ads => {
        let result: ListAdsResponse = {
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

function createAd(req: Request, rsp: Response) {
    let ad = new Ad(req.body);
    ad.save((err, savedAd) => {
        if (err) {
            rsp.status(400);
            rsp.json(err.errors);
        } else {
            rsp.json(savedAd);
        }
    })
}

function updateAd(req: Request, rsp: Response) {
    let adBody = <AdModel>req.body
    Ad.findById(adBody._id, (err, ad) => {
        if (err) {
            return rsp.json(err);
        }

        ad.title = adBody.title;
        ad.body = adBody.body;
        ad.save((err, savedJob) => {
            if (err) {
                rsp.status(400);
                rsp.json(err.errors);
            } else {
                rsp.json(savedJob);
            }
        });
    });
}
