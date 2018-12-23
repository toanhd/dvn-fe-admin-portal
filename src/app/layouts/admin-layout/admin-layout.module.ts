import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {ManageStudentComponent} from '../../manage-student/manage-student.component';
import {ManageStudentDialogComponent} from '../../manage-student/manage-student-dialog'
import {ManageLecturerComponent} from '../../manage-lecturer/manage-lecturer.component';
import {ManageLecturerDialogComponent} from '../../manage-lecturer/manage-lecturer-dialog'
import {StudentService} from '../../student-services/student.service';
import {LecturerService} from '../../lecturer-services/lecturer-service.service';
import {HttpModule} from '@angular/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatePipe} from '@angular/common';
import {AccountLecturerDialogComponent} from '../../manage-lecturer/account-lecturer-dialog';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatNativeDateModule,
    MatAutocompleteModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDialogModule,
        ReactiveFormsModule,
        HttpModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
    ],
    declarations: [
        ManageStudentComponent,
        ManageStudentDialogComponent,
        ManageLecturerComponent,
        ManageLecturerDialogComponent,
        AccountLecturerDialogComponent
    ],
    entryComponents: [
        ManageStudentDialogComponent,
        ManageLecturerDialogComponent,
        AccountLecturerDialogComponent
    ],
    providers: [
        StudentService,
        LecturerService,
        DatePipe,
    ]
})

export class AdminLayoutModule {
}
