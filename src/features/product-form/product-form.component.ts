import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { GServiceService } from '../../services/g-service.service';
import { Product } from '../../models/products.models';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products/product.service';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [  CommonModule,
    
    ReactiveFormsModule,
              MatDialogModule
            , MatFormFieldModule
            ,MatInputModule
            ,MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm!:FormGroup;
 constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
      private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.intialteForm()
    if (data) {
      this.productForm.patchValue(data);
    }
  }
 intialteForm(){
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      category: [''],
      image: [''],
    });
    }
onSubmit() {
  if (this.productForm.valid) {
    const product = { ...this.data, ...this.productForm.value } as Product;

    if (this.data?.id) {
      this.productService.updateProduct(product).subscribe((res) => {
        this.dialogRef.close(res);
      });
    } else {
      this.productService.addOne(product).subscribe((res) => {
        this.dialogRef.close(res);
      });
    }
  }
}

  
}