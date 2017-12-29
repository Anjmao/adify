import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadOverlayComponent } from './load-overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadOverlayComponent],
  exports: [LoadOverlayComponent]
})
export class LoadOverlayModule { }
