import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ManageLecturerDialogComponent} from './manage-lecturer-dialog';
import {AccountLecturerDialogComponent} from './account-lecturer-dialog';
import {LecturerService} from '../lecturer-services/lecturer-service.service';
import {DatePipe} from '@angular/common';
import {AppService} from '../app-services.service';

declare var $: any;

@Component({
    selector: 'app-manage-lecturer',
    templateUrl: './manage-lecturer.component.html',
    styleUrls: ['./manage-lecturer.component.scss']
})
export class ManageLecturerComponent implements OnInit {

    displayedColumns: string[] = ['lecID', 'name', 'school', 'dob', 'isMoE', 'action-account', 'action-update'];
    dataSource;
    spinnerLoad = false;

    constructor(public dialog: MatDialog,
                private lecturerService: LecturerService,
                private datePipe: DatePipe,
                private appService: AppService) {
    }

    ngOnInit() {
        this.loadLecturers();
    }

    loadLecturers() {
        this.lecturerService.getAll()
            .subscribe(
                data => {
                    this.dataSource = data;
                    this.spinnerLoad = false;
                },
                err => {
                }
            );
    }

    deleteLecturer(lecID) {
        console.log(lecID);
        // this.lecturerService.delete(lecID)
        //     .subscribe(
        //         err => {
        //             this.loadLecturers()
        //         }
        //     );
    }

    accountLecturer(Lecturer) {
        const newLecturerDialog = this.dialog.open(AccountLecturerDialogComponent, {
            width: '600px',
            data: Lecturer
        });
    }

    createLecturer() {
        const lecturer = {
            $class: 'org.dvn.com.Lecturer',
            lecID: '',
            info: {
                $class: 'org.dvn.com.BasicInfo',
                name: '',
                school: '',
                dob: ''
            },
            isMoE: false
        };

        const newLecturerDialog = this.dialog.open(ManageLecturerDialogComponent, {
            width: '600px',
            data: {
                dialogTitle: 'New Lecturer',
                islecID: false,
                lecID: '',
                name: '',
                school: '',
                isMoE: false
            }
        });


        newLecturerDialog.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerLoad = true;
                result.dob = this.datePipe.transform(result.dob, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                lecturer.lecID = result.lecID;
                lecturer.info.name = result.name;
                lecturer.info.school = result.school;
                lecturer.info.dob = result.dob;
                lecturer.isMoE = result.isMoE;
                this.lecturerService.create(lecturer).subscribe(
                    data => {
                        this.loadLecturers();
                    },
                    err => {
                        this.loadLecturers();
                        if (err.error.statusCode === 500) {
                            this.showNotification(
                                'bottom',
                                'right',
                                'Đã tồn tại giảng viên với ID này.')
                        }
                    }
                )
            }
        });
    }

    updateLecturer(lecturerInfo) {
        let lecAccAvail: boolean;
        this.appService.checkAccountAvail(lecturerInfo.lecID).subscribe(
            lec => {
                lecAccAvail = true;
            },
            errrrrr => {
                lecAccAvail = false;
            }
        );

        const lecturer = {
            $class: 'org.dvn.com.Lecturer',
            lecID: '',
            info: {
                $class: 'org.dvn.com.BasicInfo',
                name: '',
                school: '',
                dob: ''
            },
            isMoE: false
        };

        const updateLecturerDialog = this.dialog.open(ManageLecturerDialogComponent, {
            width: '600px',
            data: {
                dialogTitle: 'Update Lecturer Information',
                islecID: true,
                lecID: lecturerInfo.lecID,
                name: lecturerInfo.info.name,
                school: lecturerInfo.info.school,
                dob: lecturerInfo.info.dob,
                isMoE: lecturerInfo.isMoE
            }
        });


        updateLecturerDialog.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerLoad = true;
                result.dob = this.datePipe.transform(result.dob, 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                lecturer.lecID = result.lecID;
                lecturer.info.name = result.name;
                lecturer.info.school = result.school;
                lecturer.info.dob = result.dob;
                lecturer.isMoE = result.isMoE;

                if (lecAccAvail) {
                    const roleInfo = {
                        lecID: result.lecID,
                        isMoE: result.isMoE
                    };
                    this.appService.role(roleInfo).subscribe(
                        data => {
                            this.lecturerService.update(lecturer).subscribe(
                                res => {
                                    this.loadLecturers();
                                },
                                errrr => {
                                    this.loadLecturers();
                                }
                            )
                        },
                        err => {
                        }
                    );
                } else {
                    this.lecturerService.update(lecturer).subscribe(
                        res => {
                            this.loadLecturers();
                        },
                        errrr => {
                            this.loadLecturers();
                        }
                    )
                }
            }
        });
    }

    showNotification(from, align, mess) {
        const type = ['', 'info', 'success', 'warning', 'danger'];

        const color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: 'notifications',
            message: mess
        }, {
            type: type[color],
            timer: 3000,
            placement: {
                from: from,
                align: align
            },
            template:
                '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">notifications</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });
    }

}
