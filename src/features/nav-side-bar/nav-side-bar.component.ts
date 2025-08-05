import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive, Router } from "@angular/router";

@Component({
  selector: 'app-nav-side-bar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './nav-side-bar.component.html',
  styleUrl: './nav-side-bar.component.css'
})
export class NavSideBarComponent {
  constructor(
    private router: Router
  ){}
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
