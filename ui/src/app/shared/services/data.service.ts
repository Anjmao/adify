import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Company } from '../models/company.model';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    getCompanies(): Observable<Company[]> {
        return of(Array.from(Array(100))
                .map((_, i) => ({ name: 'Company ' + i})))
                .pipe(delay(1000));
    }
}
