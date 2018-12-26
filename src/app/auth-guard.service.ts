import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppService} from './app-services.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        public auth: AppService,
        public router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
}

