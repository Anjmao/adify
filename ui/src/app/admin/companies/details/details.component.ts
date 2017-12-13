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
    item: Company;
    loading;
    constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = +params['id'];
            this.loading = true;
            this.dataService.getCompany(id).subscribe(company => {
                this.loading = false;
                this.item = company;
                this.crudForm = new CrudForm([
                    new FormField({ prop: 'id', name: 'Id', value: company.id, type: FieldType.text }),
                    new FormField({ prop: 'name', name: 'Name', value: company.name, type: FieldType.text }),
                ]);
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSave($e: Company) {
        console.log('onSave', $e);
    }

    close() {
        this.router.navigate(['../..'], { relativeTo: this.route });
    }

}
