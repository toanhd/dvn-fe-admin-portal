import {Injectable} from '@angular/core';
import {AppService} from './app-services.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthNavigatorService implements CanActivate {

    constructor(
        public auth: AppService,
        public router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/manage-student']);
        return false;
    }
}
