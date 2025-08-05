import { Component } from '@angular/core';
import { NavSideBarComponent } from "../nav-side-bar/nav-side-bar.component";
import { RouterOutlet } from '@angular/router';
import { AppComponent } from "../../app/app.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavSideBarComponent, RouterOutlet, AppComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
