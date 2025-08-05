import { Component, OnInit, ViewChild } from '@angular/core';
import { GServiceService } from '../../services/g-service.service';
import { Product } from '../../models/products.models';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../../features/product-form/product-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/products/product.service';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [  MatTableModule,MatPaginatorModule,
    ReactiveFormsModule,
    MatIconModule,MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products:Product[]=[];
  displayedColumns = ['name', 'description', 'category', 'image','actions'];
   dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    searchInput = new FormControl('');
  constructor(  private productService: ProductService,
    private snackBar: MatSnackBar,
  private fb:FormBuilder,private dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.loadProducts();
    this.debouncedSearch()
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  loadProducts(){
     this.productService.fetchProducts();
      this.productService.products$.subscribe((products: Product[]) => {
        this.products = products;
        this.dataSource.data = this.products;
      });
  }
  addProduct(){
    const ref =  this.dialog.open(ProductFormComponent, { width: '40rem' });
    ref.afterClosed().subscribe(result => {
      console.log(result)
        if (result) {
          console.log(result)
         this.products.unshift(result)
         this.dataSource.data = this.products
         this.showSuccessMessage("product Added Successful")
        }
      });
  }
     updateProduct(product:Product){
      const index = this.products.findIndex((productItem)=>productItem.id===product.id)
       const ref =   this.dialog.open(ProductFormComponent, {
      width: '40rem',
      data: product
    });
    ref.afterClosed().subscribe(result => {
      console.log(result)
        if (result) {
          console.log(result)
        this.products[index]=result
         this.dataSource.data = this.products
         this.showSuccessMessage("product edited Successful")
        }
      });
     }
  deleteProduct(id:number){
   this.productService.deleteProduct(id).subscribe(()=>{
    this.loadProducts()
   })
  
  }

   showSuccessMessage(message:string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'top', 
      panelClass: ['snack-success'] 
    });
  }





    debouncedSearch() {
    this.searchInput.valueChanges
      .pipe(debounceTime(500)) // 
      .subscribe((value: any) => {
        console.log(value)
        this.dataSource.filter = value.trim().toLowerCase(); 
      });
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.description.toLowerCase().includes(filter) ||
        data.category?.toLowerCase().includes(filter)
      );
    };
  }

}
