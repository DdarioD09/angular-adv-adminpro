import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { GoogleSpanComponent } from './google-span/google-span.component';

@NgModule({
  declarations: [
    IncreaserComponent,
    DoughnutComponent,
    GoogleSpanComponent
  ],
  exports: [
    IncreaserComponent,
    DoughnutComponent,
    GoogleSpanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
