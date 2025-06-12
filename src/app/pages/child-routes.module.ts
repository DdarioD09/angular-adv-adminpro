import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Chart1Component } from "./chart1/chart1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromiseComponent } from "./promise/promise.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./maintenances/users/users.component";
import { HospitalsComponent } from "./maintenances/hospitals/hospitals.component";
import { DoctorsComponent } from "./maintenances/doctors/doctors.component";
import { DoctorComponent } from "./maintenances/doctors/doctor.component";
import { SearchesComponent } from "./searches/searches.component";

import { adminGuard } from '../guards/admin.guard';

const childrenRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme Settings' } },
  { path: 'chart1', component: Chart1Component, data: { title: 'Chart 1' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
  { path: 'promise', component: PromiseComponent, data: { title: 'Promise' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  { path: 'search/:value', component: SearchesComponent, data: { title: 'Search' } },

  // Maintenance
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals Maintenance' } },
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors Maintenance' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctors Maintenance' } },

  // ADMIN routes
  { path: 'users', canActivate: [adminGuard], component: UsersComponent, data: { title: 'Users Maintenance' } },
]

@NgModule({
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
