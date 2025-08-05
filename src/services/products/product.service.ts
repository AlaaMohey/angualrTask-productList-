import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../../models/products.models';
import { GServiceService } from '../g-service.service';
import { HttpClient } from '@angular/common/http';
import { DynamiConfigService } from '../dynami-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private sub = new BehaviorSubject<Product[]>([]);
   products$ = this.sub.asObservable();

  constructor(private gService:GServiceService,
    private loadConfig: DynamiConfigService,
    private http:HttpClient) {}

  fetchProducts(): void {
    this.http.get<Product[]>(this.loadConfig.getConfig('baseAPI')+'/product')
    .subscribe(data => this.sub.next(data));
  }
  
  addOne(product: Product): Observable<Product> {
    return this.http.post<Product>(this.loadConfig.getConfig('baseAPI')+'/product',
     product).pipe(
      tap(() => this.fetchProducts())
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.loadConfig.getConfig('baseAPI')+'/product/'+`/${product.id}`, product).pipe(
      tap(() => this.fetchProducts())
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.loadConfig.getConfig('baseAPI')+'/product/'+`/${id}`).pipe(
      tap(() => this.fetchProducts())
    );
  }
}
