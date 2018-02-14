import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudForm, FormField, FieldType } from '../../../bex';
import { DataService, AdModel } from '../../../shared';
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
                this.dataService.getAd(id).subscribe(ad => {
                    this.loading = false;
                    this.selectedRow = ad;
                    this.createForm(ad);
                });
            } else {
                this.createForm(<any>{});
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

    private createForm(item: AdModel) {
        this.crudForm = new CrudForm([
            new FormField({ prop: 'id', name: 'Id', value: item.id, type: FieldType.text, readonly: true }),
            new FormField({ prop: 'title', name: 'Title', value: item.vehicleModel, type: FieldType.text }),
            new FormField({ prop: 'content', name: 'Content', value: item.vehicleModel, type: FieldType.editor }),
            new FormField({
                prop: 'cityIds',
                name: 'Cities',
                value: null,
                type: FieldType.multiSelect,
                dataSource: {
                    data: this.dataService.getCities(),
                    bindLabel: 'name',
                    bindValue: 'id'
                }
            }),
        ]);
    }

}
