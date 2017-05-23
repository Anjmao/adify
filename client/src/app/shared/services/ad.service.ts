import { ApiService } from './';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AdModel, ListAdsResponse } from "app/shared/models/ad.model";

@Injectable()
export class AdService {

    constructor(private apiService: ApiService) { }

    getAds(): Observable<ListAdsResponse> {
        return this.apiService.get('/ads');
    }

    getAd(id: string): Observable<AdModel> {
        return this.apiService.get(`/ads/${id}`);
    }

    createAd(job: AdModel): Observable<any> {
        return this.apiService.post('/ads', job);
    }
}
