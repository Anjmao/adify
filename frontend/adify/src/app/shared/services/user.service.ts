import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { JwtService } from './jwt.service';
import { UserModel } from '../models';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<UserModel>(<UserModel>{});
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private jwtService: JwtService
    ) { }

    populate() {
        if (this.jwtService.getToken()) {
            this.getUser()
                .subscribe(
                data => this.setAuth(data),
                _ => this.purgeAuth()
                );
        } else {
            this.purgeAuth();
        }
    }

    setAuth(user: UserModel) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    getUser(): Observable<UserModel> {
        return null;
        // return this.apiService.get('/user');
    }

    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next(<UserModel>{});
        this.isAuthenticatedSubject.next(false);
    }


    getCurrentUser(): UserModel {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(_): Observable<UserModel> {
        return null;
    }

    logout(): Observable<any> {
        return null;
    }
}
