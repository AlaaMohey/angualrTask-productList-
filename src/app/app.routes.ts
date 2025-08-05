import { Routes } from '@angular/router';
import { LoginComponent } from '../features/login/login.component';
import { MainLayoutComponent } from '../features/main-layout/main-layout.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { ProductsComponent } from '../modules/products/products.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { SettingComponent } from '../modules/setting/setting.component';
import { LoginGaurdService } from '../services/gaurds/login-gaurd.service';
export const routes: Routes = [
  {path:'',component:MainLayoutComponent
    ,children:[
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
      {path:'products',component:ProductsComponent,canActivate:[AuthGuard]},
      {path:'setting',component:SettingComponent,canActivate:[AuthGuard]}
    ]
  }
  ,
  { path: 'login', component: LoginComponent,canActivate:[LoginGaurdService] },
  { path: '**', redirectTo: '/login' }
];
