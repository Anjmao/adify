import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { AdModel, ListAdsResponse } from 'app/shared/models/ad.model';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/observable/of';

export interface City {
    id: string;
    name: string;
}

@Injectable()
export class FilterService {

    constructor() { }

    getCities(): Observable<City[]> {
        return Observable.of([
            {id: '1', name: 'Vilnius'},
            {id: '2', name: 'Kaunas'}
        ])
    }

}
