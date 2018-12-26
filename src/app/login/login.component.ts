import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '../app-services.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    loginMess;

    constructor(
        private authenService: AppService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onLogin() {
        if (this.loginForm.valid) {
            const user = this.loginForm.value;
            user.port = 'admin';
            this.authenService.logIn(user).subscribe(
                data => {
                    if (data.response.login) {
                        localStorage.setItem('token', data.response.token);
                        this.router.navigateByUrl('/manage-student');
                        // localStorage.setItem('userID', data.response.userID);
                    }
                },
                err => {
                    if (err.message === 'Unauthorized') {
                        this.loginMess = 'Tài khoản không có quyền truy cập!'
                    } else {
                        this.loginMess = 'Sai thông tin đăng nhập!'
                    }
                }
            )
        }
    }
}
