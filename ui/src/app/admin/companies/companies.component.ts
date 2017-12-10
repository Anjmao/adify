import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared';
import { Company } from '../../shared/models/company.model';
import { FormField, FieldType, CrudForm } from '../../bex';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

    constructor(private dataService: DataService) {
    }

    rows: Company[] = [];
    selected = [];
    loadingIndicator = true;
    reorderable = true;

    columns = [
        { prop: 'id', name: 'Id' },
        { prop: 'name', name: 'Name' }
    ];

    crudForm = null;

    ngOnInit() {
        this.dataService.getCompanies().subscribe(x => {
            this.rows = x;
            this.loadingIndicator = false;
        });
    }

    onSelect($e) {
        const company: Company = $e.selected[0];
        this.crudForm = new CrudForm([
            new FormField({ prop: 'id', name: 'Id', value: company.id, type: FieldType.text }),
            new FormField({ prop: 'name', name: 'Name', value: company.name, type: FieldType.text }),
        ]);
    }

    onSave($e: Company) {
        console.log('onSave', $e);
        const rowIndex = this.rows.findIndex(x => x.id === $e.id);
        this.rows[rowIndex] = $e;
    }

}
