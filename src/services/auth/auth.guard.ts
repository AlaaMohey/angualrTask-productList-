import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn())
       return true;
    this.router.navigate(['/login']);
    return false;
  }
}