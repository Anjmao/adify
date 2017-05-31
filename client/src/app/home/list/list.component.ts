import { AdModel, UserModel, ListAdsRequest } from 'app/shared/models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'
import { UserService, AdService } from "app/shared";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'ads-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class AdsListComponent implements OnInit {

    ads: AdModel[] = [];
    user: UserModel;
    filter: ListAdsRequest = {};
    searchInput = new FormControl();

    cities = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
        'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
        'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
        'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
        'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
        'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
        'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
        'Zagreb', 'Zaragoza', 'Łódź'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adService: AdService,
        private userService: UserService,
    ) {
        this.setCurrentUser();
    }

    ngOnInit() {
        this.route.params.subscribe(p => {
            this.filter.cuser = p.cuser;
            this.loadAds();
        });

        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(term => {
                this.filter.search = term;
                this.loadAds();
            });
    }

    search($event) {
        this.filter.search = $event.target.value;
        this.loadAds();
    }

    deleteAd(ad: AdModel) {
        if (confirm('Are you sure?')) {
            this.adService.deleteAd(ad._id).subscribe(() => {
                this.loadAds();
            });
        }
    }

    private setCurrentUser() {
        this.userService.currentUser.subscribe((u) => {
            this.user = u;
        });
    }

    private loadAds() {
        this.adService.getAds(this.filter).subscribe(rsp => this.ads = rsp.ads)
    }

}
