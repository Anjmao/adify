import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// import { UserService } from '../shared';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        // private userService: UserService
    ) { }

    canActivate(
        _: ActivatedRouteSnapshot,
        _1: RouterStateSnapshot
    ): Observable<boolean> {

        // return this.userService.isAuthenticated.take(1).map(bool => !bool);
        return of(true);
    }
}
