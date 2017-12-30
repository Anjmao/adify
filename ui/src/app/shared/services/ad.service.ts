import { ListAdsRequest } from '../models/ad.model';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdModel, ListAdsResponse } from '../models/ad.model';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/observable/of';

@Injectable()
export class AdService {

    constructor(private apiService: ApiService) { }

    getAds(query: ListAdsRequest = {}): Observable<ListAdsResponse> {
        const params = new URLSearchParams();
        // tslint:disable-next-line:forin
        for (const key in query) {
            params.set(key.toString(), query[key]);
        }
        return this.apiService.get('/ads', params);
    }

    getAd(id: string): Observable<AdModel> {
        return this.apiService.get(`/ads/${id}`);
    }

    createAd(ad: AdModel): Observable<any> {
        return this.apiService.post('/ads', ad);
    }

    updateAd(ad: AdModel): Observable<any> {
        return this.apiService.put('/ads', ad);
    }

    deleteAd(id: string): Observable<any> {
        return this.apiService.delete(`/ads/${id}`);
    }
}

@Injectable()
export class MockAdService {
    constructor(private apiService: ApiService) { }

    ads: AdModel[] = [
        {title: 'ad 1', content: 'test'}
    ];

    getAds(_: ListAdsRequest = {}): Observable<ListAdsResponse> {
        const rsp: ListAdsResponse = {
            ads: this.ads
        };
        return Observable.of(rsp);
    }

    getAd(id: string): Observable<AdModel> {
        return this.apiService.get(`/ads/${id}`);
    }

    createAd(ad: AdModel): Observable<any> {
        return this.apiService.post('/ads', ad);
    }

    updateAd(ad: AdModel): Observable<any> {
        return this.apiService.put('/ads', ad);
    }

    deleteAd(id: string): Observable<any> {
        return this.apiService.delete(`/ads/${id}`);
    }
}
