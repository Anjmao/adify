import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudFormComponent } from './crud-form.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [CrudFormComponent],
  exports: [CrudFormComponent]
})
export class CrudFormModule { }
