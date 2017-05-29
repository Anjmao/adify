import { ListAdsRequest } from '../models/ad.model';
import { ApiService } from './';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AdModel, ListAdsResponse } from 'app/shared/models/ad.model';
import { URLSearchParams } from '@angular/http'

@Injectable()
export class AdService {

    constructor(private apiService: ApiService) { }

    getAds(query: ListAdsRequest = {}): Observable<ListAdsResponse> {
        let params = new URLSearchParams();
        for (let key in query) {
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
