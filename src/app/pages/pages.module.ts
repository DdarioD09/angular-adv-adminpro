import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Chart1Component } from './chart1/chart1.component';
import { PagesComponent } from './pages.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    Chart1Component,
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    PromiseComponent,
    RxjsComponent
  ],
  exports: [
    AccountSettingsComponent,
    Chart1Component,
    DashboardComponent,
    ProgressComponent,
    PagesComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
    SharedModule
  ],
})
export class PagesModule { }
