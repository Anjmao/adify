import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';
import { Company } from '../models/company.model';

@Injectable()
export class DataService {
    fakeCompanies = Array.from(Array(100)).map((_, i) => ({ id: i, name: 'Company ' + i}));

    constructor(_: HttpClient) { }

    getCompanies(): Observable<Company[]> {
        return of(this.fakeCompanies).pipe(delay(1000));
    }

    getCompany(companyId: number): Observable<Company> {
        return of(this.fakeCompanies.find(x => x.id === companyId)).pipe(delay(1000));
    }
}
