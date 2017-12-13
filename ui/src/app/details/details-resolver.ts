import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AdService, AdModel } from '../shared';

@Injectable()
export class AdResolver implements Resolve<AdModel> {
    constructor(
        private adService: AdService,
        private router: Router
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        _: RouterStateSnapshot
    ): Observable<any> {

        return this.adService.getAd(route.params['id'])
            .catch((_1) => this.router.navigateByUrl('/'));

    }
}
