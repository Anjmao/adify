import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

export enum FieldType {
    text,
    number,
    date,
    textarea,
    boolean,
    select
}

export class FormField {
    prop: string;
    name: string;
    type: FieldType;
    value?: any;
    readonly?: boolean;
    validators: (ValidatorFn | null | undefined)[];

    constructor(options: {
            prop: string,
            name: string,
            type: FieldType,
            value?: any,
            readonly?: boolean;
            validators?: (ValidatorFn | null | undefined)[]}) {
        this.prop = options.prop;
        this.name = options.name;
        this.type = options.type;
        this.value = options.value;
        this.readonly = options.readonly;
        this.validators = this.validators;
    }
}

export class CrudForm {
    constructor(private fields: FormField[]) {}

    toReactiveForm(builder: FormBuilder) {
        const fieldsMap:  {[key: string]: any} = {};
        this.fields.forEach(field => {
            fieldsMap[field.prop] = field.value || '';
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
