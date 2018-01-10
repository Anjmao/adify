import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../shared';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
    constructor(
        private userService: UserService
    ) { }

    resolve(
        _: ActivatedRouteSnapshot,
        _1: RouterStateSnapshot
    ): Observable<boolean> {

        return this.userService.isAuthenticated.take(1);

    }
}
