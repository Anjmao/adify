import { Request, Response, Router } from 'express'
import { AdModel, Ad } from '../model/ad';

export interface ListAdsResponse {
    ads: AdModel[]
}

export const route = Router();
route.get('/ads', listAds);
route.get('/ads/:id', getAd);
route.post('/ads', createAd);
route.put('/ads', updateAd);

function listAds(req: Request, rsp: Response) {
    Ad.find().select('title').then(ads => {
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
    const ad = new Ad(req.body);
    ad.save((err, savedAd) => {
        if (err) {
            rsp.status(400);
            rsp.json({ error: err.errors });
        } else {
            rsp.json(savedAd);
        }
    })
}

function updateAd(req: Request, rsp: Response) {
    const adBody = <AdModel>req.body
    Ad.findById(adBody._id, (err, ad) => {
        if (err) {
            return rsp.json(err);
        }

        if (!ad) {
            rsp.status(404);
            return rsp.json({ error: `ad ${adBody._id} not found` });
        }

        ad.title = adBody.title;
        ad.body = adBody.body;
        ad.save((err2, savedJob) => {
            if (err2) {
                rsp.status(400);
                rsp.json(err2.errors);
            } else {
                rsp.json(savedJob);
            }
        });
    });
}
