import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductActions from './product.actions';
import { ApiAdapter } from '../services/api.adapter';

@Injectable()
export class ProductEffects {

  /**
   * Efecto para cargar los productos iniciales cuando se despacha la acción 'loadProducts'.
   * Llama al servicio ApiAdapter para obtener los productos de una API externa y luego
   * despacha la acción 'loadProductsSuccess' con los productos cargados.
   * Si ocurre un error, despacha la acción 'loadProductsSuccess' con un array vacío.
   */
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts), // Filtra las acciones de tipo 'loadProducts'
      mergeMap(({ limit, offset }) => // Realiza una solicitud para obtener productos con los parámetros limit y offset
        this.apiAdapter.getProducts(limit, offset).pipe(
          map(products => ProductActions.loadProductsSuccess({ products })), // Si la solicitud es exitosa, despacha 'loadProductsSuccess'
          catchError(() => of(ProductActions.loadProductsSuccess({ products: [] }))) // Si ocurre un error, despacha 'loadProductsSuccess' con productos vacíos.
        )
      )
    )
  );

  /**
   * Efecto para cargar más productos cuando se despacha la acción 'loadMoreProducts'.
   * Llama al servicio ApiAdapter para obtener más productos de la API y luego
   * despacha la acción 'loadMoreProductsSuccess' con los nuevos productos.
   * Si ocurre un error, despacha la acción 'loadMoreProductsSuccess' con un array vacío.
   */
  loadMoreProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadMoreProducts), // Filtra las acciones de tipo 'loadMoreProducts'
      mergeMap(({ limit, offset }) => // Realiza una solicitud para obtener más productos con los parámetros limit y offset
        this.apiAdapter.getProducts(limit, offset).pipe(
          map(products => ProductActions.loadMoreProductsSuccess({ products })), // Si la solicitud es exitosa, despacha 'loadMoreProductsSuccess'
          catchError(() => of(ProductActions.loadMoreProductsSuccess({ products: [] }))) // Si ocurre un error, despacha 'loadMoreProductsSuccess' con productos vacíos.
        )
      )
    )
  );

  // Constructor para inyectar los servicios necesarios
  constructor(
    private actions$: Actions,       // Se inyecta el servicio de Actions para observar las acciones despachadas
    private apiAdapter: ApiAdapter  // Se inyecta el servicio ApiAdapter para realizar las solicitudes a la API
  ) {}
}
