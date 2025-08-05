import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
      constructor( private fb: FormBuilder,
         private router: Router, private loginService:LoginService){
        this.intiateForm();
      }
intiateForm(){
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
}
onSubmit(){
  if(this.loginForm.valid){
    this.loginService.login()
    this.router.navigate(['/dashboard']);
  }
}
}
