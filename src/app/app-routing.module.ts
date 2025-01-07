import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({
  declarations: [],
  imports: [
    AuthRoutingModule,
    PagesRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
