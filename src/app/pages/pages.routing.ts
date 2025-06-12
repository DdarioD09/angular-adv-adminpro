import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { authGuard } from "../guards/auth.guard";

import { PagesComponent } from "./pages.component";


const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [authGuard],
        // canLoad deprecated, check usage in the routes.
        component: PagesComponent,
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }