import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { Company } from '../models/company.model';
import { AdModel } from '../index';
import { CityModel } from '../models/city.model';
import { GetAdsResponse } from "../models";

export interface LatestAd {
    photoUrl: string;
    vehicleModel: string;
    city: string;
    price: number;
}

export interface LatestAdsResponse {
    result: LatestAd[]
}

@Injectable()
export class DataService {
    fakeCompanies = Array.from(Array(100)).map((_, i) => ({ id: i + 1, name: 'Company ' + i }));
    fakeAds: AdModel[] = [
        {
            id: 1,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/audi.jpg?alt=media',
            vehicleModel: 'Audi 100',
            city: 'Vilnius',
            price: 20
        },
        {
            id: 2,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/bmw.jpg?alt=media',
            vehicleModel: 'BMW 520',
            city: 'Kaunas',
            price: 35
        },
        {
            id: 3,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/passat.jpg?alt=media',
            vehicleModel: 'Passat',
            city: 'Vinius',
            price: 15
        },
        {
            id: 4,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/tesla.jpg?alt=media',
            vehicleModel: 'Passat',
            city: 'Kaunas',
            price: 130
        }
        ,
        {
            id: 5,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/bmw.jpg?alt=media',
            vehicleModel: 'BMW 520',
            city: 'Kaunas',
            price: 35
        },
        {
            id: 6,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/passat.jpg?alt=media',
            vehicleModel: 'Passat',
            city: 'Vinius',
            price: 15
        },
        {
            id: 7,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/tesla.jpg?alt=media',
            vehicleModel: 'Passat',
            city: 'Kaunas',
            price: 130
        }
        ,
        {
            id: 8,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/passat.jpg?alt=media',
            vehicleModel: 'Passat',
            city: 'Vinius',
            price: 15
        },
        {
            id: 9,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/tesla.jpg?alt=media',
            vehicleModel: 'Passat',
            city: 'Kaunas',
            price: 130
        }
    ]
    fakeCities = Array.from(Array(100)).map((_, i) => ({ id: i + 1, name: 'City ' + i }));

    constructor(_: HttpClient) {
    }

    getCompanies(): Observable<Company[]> {
        return of(this.fakeCompanies).pipe(delay(1000));
    }

    getAds(request): Observable<GetAdsResponse> {
        console.log('request', request)
        return of({ result: this.fakeAds, totalCount: this.fakeAds.length }).pipe(delay(1000));
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

    getLatestAds(): Observable<LatestAd[]> {
        return of({
            result: [
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/audi.jpg?alt=media',
                    vehicleModel: 'Audi 100',
                    city: 'Vilnius',
                    price: 20
                },
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/bmw.jpg?alt=media',
                    vehicleModel: 'BMW 520',
                    city: 'Kaunas',
                    price: 35
                },
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/passat.jpg?alt=media',
                    vehicleModel: 'Passat',
                    city: 'Vinius',
                    price: 15
                },
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/tesla.jpg?alt=media',
                    vehicleModel: 'Passat',
                    city: 'Kaunas',
                    price: 130
                }
                ,
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/bmw.jpg?alt=media',
                    vehicleModel: 'BMW 520',
                    city: 'Kaunas',
                    price: 35
                },
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/passat.jpg?alt=media',
                    vehicleModel: 'Passat',
                    city: 'Vinius',
                    price: 15
                },
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/tesla.jpg?alt=media',
                    vehicleModel: 'Passat',
                    city: 'Kaunas',
                    price: 130
                }
                ,
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/passat.jpg?alt=media',
                    vehicleModel: 'Passat',
                    city: 'Vinius',
                    price: 15
                },
                {
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/adifyapp.appspot.com/o/tesla.jpg?alt=media',
                    vehicleModel: 'Passat',
                    city: 'Kaunas',
                    price: 130
                }
            ]
        }).pipe(
            delay(1000),
            map(rsp => rsp.result)
        )
    }

    getCompany(companyId: number): Observable<Company> {
        return of(this.fakeCompanies.find(x => x.id === companyId)).pipe(delay(1000));
    }
}
