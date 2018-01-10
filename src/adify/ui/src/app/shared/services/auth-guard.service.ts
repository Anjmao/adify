import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(
        _: ActivatedRouteSnapshot,
        _1: RouterStateSnapshot
    ): Observable<boolean> {
        return this.userService.isAuthenticated.take(1).map(x => {
            if (!x) {
                this.router.navigateByUrl('/login');
            }
            return x;
        });
    }
}
