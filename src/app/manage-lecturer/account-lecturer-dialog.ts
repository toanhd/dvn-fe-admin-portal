import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AppService} from '../app-services.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-account-lecturer-dialog',
    templateUrl: 'account-lecturer-dialog.html',
})
export class AccountLecturerDialogComponent implements OnInit {

    lecAcc;
    querryMess;
    activeForm = false;
    availLec = false;
    newPwdFill = false;
    createAccForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });
    newPwdForm = new FormGroup({
        password: new FormControl('', Validators.required),
    });

    constructor(
        public dialogRef: MatDialogRef<AccountLecturerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private appService: AppService) {
    }

    ngOnInit(): void {
        this.checkLecAvail(this.data.lecID)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    checkLecAvail(lecID) {
        this.querryMess = undefined;
        this.newPwdFill = false;
        this.appService.checkAccountAvail(lecID).subscribe(
            data => {
                // console.log(data.response.user)
                this.availLec = true;
                this.activeForm = false;
                this.createAccForm.reset();
                this.data = data.response.user;
            },
            err => {
                this.querryMess = 'Chưa tồn tại tài khoản cho giảng viên này.'
            }
        )
    }

    createLecAccount(lecInfo) {
        if (this.createAccForm.valid) {
            const lecturer = {
                username: lecInfo.username.toLowerCase(),
                password: lecInfo.password,
                isMoE: this.data.isMoE,
                roleID: this.data.lecID,
                disabled: false,
            };
            this.appService.createAccount(lecturer).subscribe(
                data => {
                    this.showNotification(
                        'bottom',
                        'right',
                        'Thành công! Hoàn thành tạo tài khoản.')
                    this.checkLecAvail(this.data.lecID)
                },
                err => {
                    this.showNotification(
                        'bottom',
                        'right',
                        'Thất bại! Xảy ra lỗi trong quá trình tạo tài khoản.')
                }
            )
        }
    }

    resetPwd(newPwd) {
        this.newPwdFill = true;
        const pwdIn = {
            username: this.data.username,
            password: newPwd
        };
        this.appService.resetPwd(pwdIn).subscribe(
            data => {
                this.checkLecAvail(this.data.roleID);
                this.showNotification(
                    'bottom',
                    'right',
                    'Thành công! Hoàn thành tạo mật khẩu mới.')
            },
            err => {
                this.showNotification(
                    'bottom',
                    'right',
                    'Thất bại! Xảy ra lỗi.')
            }
        )
    }

    accStatus(status) {
        const accStatus = {
            username: this.data.username,
            disabled: status
        };
        this.appService.accStatus(accStatus).subscribe(
            data => {
                this.checkLecAvail(this.data.roleID);
                this.showNotification(
                    'bottom',
                    'right',
                    'Thành công!');
                this.newPwdFill = false;
            },
            err => {
                this.showNotification(
                    'bottom',
                    'right',
                    'Thất bại! xảy ra lỗi')
            }
        )
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