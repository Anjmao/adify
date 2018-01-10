import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

export enum FieldType {
    text = 'text',
    number = 'number',
    date = 'date',
    textarea = 'textarea',
    boolean = 'boolean',
    select = 'select',
    multiSelect = 'multiSelect',
    editor = 'editor'
}

interface FormFieldDataSource {
    data: Observable<any>;
    bindLabel: string;
    bindValue: string;
}

export class FormField {
    prop: string;
    name: string;
    type: FieldType;
    value?: any;
    dataSource?: FormFieldDataSource;
    readonly?: boolean;
    validators: (ValidatorFn | null | undefined)[];

    constructor(options: {
            prop: string,
            name: string,
            type: FieldType,
            value?: any,
            dataSource?: FormFieldDataSource;
            readonly?: boolean;
            validators?: (ValidatorFn | null | undefined)[]}) {
        this.prop = options.prop;
        this.name = options.name;
        this.type = options.type;
        this.value = options.value;
        this.dataSource = options.dataSource;
        this.readonly = options.readonly;
        this.validators = this.validators;
    }
}

export class CrudForm {
    constructor(public fields: FormField[]) {}

    toReactiveForm(builder: FormBuilder) {
        const fieldsMap:  {[key: string]: any} = {};
        this.fields.forEach(field => {
            fieldsMap[field.prop] = [field.value || ''];
        });
        return builder.group(fieldsMap);
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'bex-crud-form',
    templateUrl: './crud-form.component.html',
    styleUrls: ['./crud-form.component.scss']
})
export class CrudFormComponent implements OnChanges {

    @Input('form') form: CrudForm;
    @Output() save = new EventEmitter();
    reactiveForm: FormGroup;
    constructor(private fb: FormBuilder) { }

    ngOnChanges(change: SimpleChanges) {
        if (change.form.currentValue) {
            this.createForm();
        }
    }

    saveForm() {
        this.save.emit(this.reactiveForm.value);
    }

    private createForm() {
        this.reactiveForm = this.form.toReactiveForm(this.fb);
    }
}
