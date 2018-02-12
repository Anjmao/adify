import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Company } from '../models/company.model';
import { AdModel } from '../index';
import { CityModel } from '../models/city.model';

export interface LatestAdsResponse {

}

@Injectable()
export class DataService {
    fakeCompanies = Array.from(Array(100)).map((_, i) => ({ id: i + 1, name: 'Company ' + i}));
    fakeAds = Array.from(Array(100)).map((_, i) => ({ id: i + 1, title: 'Ad ' + i, cityIds: [1, 2]}));
    fakeCities = Array.from(Array(100)).map((_, i) => ({ id: i + 1, name: 'City ' + i}));

    constructor(_: HttpClient) { }

    getCompanies(): Observable<Company[]> {
        return of(this.fakeCompanies).pipe(delay(1000));
    }

    getAds(): Observable<AdModel[]> {
        return of(this.fakeAds).pipe(delay(1000));
    }

    getAd(adId: number): Observable<AdModel> {
        return of(this.fakeAds.find(x => x.id === adId)).pipe(delay(1000));
    }

    getCities(): Observable<CityModel[]> {
        return of(this.fakeCities).pipe(delay(1000));
    }

    saveCompany(company: Company): Observable<any> {
        console.log('saveCompany', company);
        return of(null);
    }

    getLatestAds() {

    }

    getCompany(companyId: number): Observable<Company> {
        return of(this.fakeCompanies.find(x => x.id === companyId)).pipe(delay(1000));
    }
}
