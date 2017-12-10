import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared';
import { Company } from '../../shared/models/company.model';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

    constructor(private dataService: DataService) {
    }

    rows: Company[] = [];
    loadingIndicator = true;
    reorderable = true;

    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company', sortable: false }
    ];

    ngOnInit() {
        this.dataService.getCompanies().subscribe(x => {
            this.rows = x;
            this.loadingIndicator = false;
        });
    }

}
