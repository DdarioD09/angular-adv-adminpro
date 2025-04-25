import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncreaserComponent } from './increaser/increaser.component';

@NgModule({
  declarations: [
    IncreaserComponent
  ],
  exports: [
    IncreaserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
