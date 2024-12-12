import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../../models/category';
import { PagedDto } from '../../models/pagedDto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.backUrl}/api/Categoria`;

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías (paginadas)
  /* getCategories(pageNumber: number = 1, pageSize: number = 10): Observable<PagedDto<Category>> {
    return this.http.get<PagedDto<Category>>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  } */

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva categoría
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Actualizar una categoría existente
  updateCategory(id: number, category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }

  // Eliminar una categoría
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
