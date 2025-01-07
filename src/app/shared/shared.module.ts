import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';

@NgModule({
  declarations: [
    BreadCrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    BreadCrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [CommonModule]
})
export class SharedModule { }
