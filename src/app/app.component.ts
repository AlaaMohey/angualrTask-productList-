import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '../features/main-layout/main-layout.component';
import { NavSideBarComponent } from "../features/nav-side-bar/nav-side-bar.component";
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    CommonModule,
    ToastrModule,
    NavSideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
  constructor(public auth:LoginService
    ,private toaster:ToastrService
  ){}
}
