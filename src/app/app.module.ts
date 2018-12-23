import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule, MatProgressSpinnerModule
} from '@angular/material';
import {AppService} from './app-services.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule
        // AgmCoreModule.forRoot({
        //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        // })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
