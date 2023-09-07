import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../Services/user-auth.service';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router,
    private authService: UserAuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = JSON.parse(localStorage.getItem('userCredentials')!);
    let username = userData.username;
    let password = userData.password;
    console.log(this.authService.isUserLogged);
    if (this.authService.isUserLogged && username == 'admin' && password == 'admin') {
      return true
    }
    else {
      alert('You are not authorized, please logout and login again....')
      this.router.navigate(['/Login'])
      return false
    }
  }
}

export const AdminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
