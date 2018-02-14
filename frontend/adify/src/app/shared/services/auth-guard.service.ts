import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
    ) { }

    canActivate(
        _: ActivatedRouteSnapshot,
        _1: RouterStateSnapshot
    ): Observable<boolean> {
        return of(true)
    }
}
