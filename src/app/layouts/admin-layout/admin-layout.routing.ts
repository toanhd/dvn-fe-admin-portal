import {Routes} from '@angular/router';

import {ManageStudentComponent} from '../../manage-student/manage-student.component';
import {ManageLecturerComponent} from '../../manage-lecturer/manage-lecturer.component';


export const AdminLayoutRoutes: Routes = [
    {path: 'manage-student', component: ManageStudentComponent},
    {path: 'manage-lecturer', component: ManageLecturerComponent},
];
