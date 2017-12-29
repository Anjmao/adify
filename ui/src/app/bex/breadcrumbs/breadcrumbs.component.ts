import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bex-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() useBootstrap = true;
    @Input() prefix = '';

    public _urls: string[];
    public _routerSubscription: any;

    constructor(
        private router: Router,
        private breadcrumbService: BreadcrumbsService
    ) {}

    ngOnInit(): void {
        this._urls = new Array();

        if (this.prefix.length > 0) {
            this._urls.unshift(this.prefix);
        }

        const currentUrl = this.router.routerState.snapshot.url;
        this.generateBreadcrumbTrail(currentUrl);

        this._routerSubscription = this.router.events.subscribe((navigationEnd: NavigationEnd) => {
           if (navigationEnd instanceof NavigationEnd) {
                this._urls.length = 0;
                this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
            }
        });
    }

    ngOnChanges(_: any): void {
        if (!this._urls) {
            return;
        }

        this._urls.length = 0;
        this.generateBreadcrumbTrail(this.router.url);
    }

    generateBreadcrumbTrail(url: string): void {
        if (!this.breadcrumbService.isRouteHidden(url)) {
            // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
            this._urls.unshift(url);
        }

        if (url.lastIndexOf('/') > 0) {
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/')));
        } else if (this.prefix.length > 0) {
            this._urls.unshift(this.prefix);
        }
    }

    navigateTo(url: string): void {
        this.router.navigateByUrl(url);
    }

    friendlyName(url: string): string {
        return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url);
    }

    ngOnDestroy(): void {
        this._routerSubscription.unsubscribe();
    }

}
