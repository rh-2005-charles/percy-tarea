import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.backUrl}/api/Producto`;
  private apiUrlCat=`${environment.backUrl}/api/Categoria`;
  constructor(private http: HttpClient) {}

  /* getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  } */

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Actualizar una producto existente
  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar una producto
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCat);
  }
}
