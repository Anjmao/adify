import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AdService, UserService, AdModel } from 'app/shared';

@Injectable()
export class AdResolver implements Resolve<AdModel> {
    constructor(
        private adService: AdService,
        private router: Router,
        private userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {

        return this.adService.getAd(route.params['id'])
            .catch((err) => this.router.navigateByUrl('/'));

    }
}
