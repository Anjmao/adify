import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudForm, FormField, FieldType } from '../../../bex';
import { Company, DataService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {

    crudForm = null;
    sub: any;
    loading;
    selectedRow;
    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id > 0) {
                this.loading = true;
                this.dataService.getCompany(id).subscribe(company => {
                    this.loading = false;
                    this.selectedRow = company;
                    this.createForm(company);
                });
            } else {
                this.createForm({});
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave($event) {
        console.log('onSave', $event);
        this.dataService.saveCompany($event);
        this.close();
    }

    close() {
        this.router.navigate(['../..'], { relativeTo: this.route });
    }

    private createForm(item: Company) {
        this.crudForm = new CrudForm([
            new FormField({ prop: 'id', name: 'Id', value: item.id, type: FieldType.text }),
            new FormField({ prop: 'name', name: 'Name', value: item.name, type: FieldType.text }),
            new FormField({
                prop: 'dropdown',
                name: 'Dropdown',
                value: null,
                type: FieldType.select,
                dataSource: {
                    data: this.dataService.getCompanies(),
                    bindLabel: 'name',
                    bindValue: 'id'
                }
            }),
        ]);
    }

}
