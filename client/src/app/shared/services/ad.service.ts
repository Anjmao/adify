import { ApiService } from './';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AdModel, ListAdsResponse } from 'app/shared/models/ad.model';

@Injectable()
export class AdService {

    constructor(private apiService: ApiService) { }

    getAds(): Observable<ListAdsResponse> {
        return this.apiService.get('/ads');
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
}
