import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { UserService } from '../shared';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private userService: UserService
    ) { }

    canActivate(
        _: ActivatedRouteSnapshot,
        _1: RouterStateSnapshot
    ): Observable<boolean> {

        return this.userService.isAuthenticated.take(1).map(bool => !bool);
    }
}
