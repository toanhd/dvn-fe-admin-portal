import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService as AuthGuard} from './auth-guard.service';
import {AuthNavigatorService as AuthNav} from './auth-navigator.service'

const routes: Routes = [
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
        }, {
            path: '',
            canActivate: [AuthGuard],
            component: AdminLayoutComponent,
            children: [
                {
                    path: '',
                    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
                }]
        },
        {
            path: 'login',
            canActivate: [AuthNav],
            component: LoginComponent
        },
    ]
;

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
