import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudFormComponent } from './crud-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [CrudFormComponent],
  exports: [CrudFormComponent]
})
export class CrudFormModule { }
