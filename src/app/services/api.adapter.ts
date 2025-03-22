import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' // Permite que el servicio esté disponible en toda la aplicación sin necesidad de declararlo en un módulo.
})
export class ApiAdapter {
  // URL de la API desde donde se obtienen los datos (en este caso, un placeholder de JSONPlaceholder).
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {} // Se inyecta HttpClient para realizar peticiones HTTP.

  /**
   * Obtiene una lista de productos desde la API.
   * @param limit - Cantidad de productos a obtener.
   * @param offset - Posición desde donde empezar la consulta (paginación).
   * @returns Observable<Product[]> - Un flujo de datos con los productos transformados.
   */
  getProducts(limit: number, offset: number): Observable<Product[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      map(posts => 
        posts.slice(offset, offset + limit).map(post => ({
          id: post.id, // ID del producto, proveniente del post de la API.
          title: post.title, // Título del producto, basado en el título del post.
          description: post.body, // Descripción del producto, basada en el cuerpo del post.
          status: 'pendiente', // Se inicializa con estado 'pending' por defecto.
          createdAt: new Date() // Se asigna la fecha actual como fecha de creación.
        }))
      )
    );
  }
}
