import { Component } from '@angular/core';
import { Product } from '../../models/products.models';
import { GServiceService } from '../../services/g-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   
  constructor(private gService:GServiceService){
    
  }

  
}

