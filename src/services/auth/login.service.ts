import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router
  ) { }

  login() {
    localStorage.setItem('token', 'mocktoken');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    console.log(localStorage.getItem('token'))
    return !!localStorage.getItem('token');
  }
}
