import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { UserModel } from '../models';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<UserModel>(<UserModel>{});
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private http: Http,
        private jwtService: JwtService
    ) { }

    populate() {
        if (this.jwtService.getToken()) {
            this.getUser()
                .subscribe(
                data => this.setAuth(data),
                err => this.purgeAuth()
                );
        } else {
            this.purgeAuth();
        }
    }

    setAuth(user: UserModel) {
        //this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    getUser(): Observable<UserModel> {
        return this.apiService.get('/user')
    }

    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next(<UserModel>{});
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type, credentials): Observable<UserModel> {
        let route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, { user: credentials })
            .map(
            data => {
                this.setAuth(data.user);
                return data;
            }
            );
    }

    getCurrentUser(): UserModel {
        return this.currentUserSubject.value;
    }

    // Update the user on the server (email, pass, etc)
    update(user): Observable<UserModel> {
        return this.apiService
            .put('/user', { user })
            .map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.user);
                return data.user;
            });
    }

    logout(): Observable<any> {
        return this.apiService.get('/logout').map(() => this.purgeAuth())
    }

}
