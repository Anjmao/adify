import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared';
import { Company } from '../../shared/models/company.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

    constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    }

    rows: Company[] = [];
    selected = [];
    loadingIndicator = true;
    reorderable = true;

    columns = [
        { prop: 'id', name: 'Id' },
        { prop: 'name', name: 'Name' }
    ];

    ngOnInit() {
        this.dataService.getCompanies().subscribe(rows => {
            this.rows = rows;
            this.loadingIndicator = false;
        });
    }

    onSelect($e) {
        const company: Company = $e.selected[0];
        this.router.navigate(['details', company.id], { relativeTo: this.route });
    }
}
