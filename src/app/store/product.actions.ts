import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

/**
 * Acción para cargar la lista inicial de productos.
 * Se pasa un límite (cantidad de productos a obtener) y un offset (posición inicial).
 */
export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ limit: number; offset: number }>() // Define los parámetros que recibirá la acción.
);

/**
 * Acción que se ejecuta cuando los productos han sido cargados exitosamente.
 * Se pasa la lista de productos obtenida.
 */
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

/**
 * Acción para cargar más productos cuando se hace scroll.
 */
export const loadMoreProducts = createAction(
  '[Product] Load More Products',
  props<{ limit: number; offset: number }>()
);

/**
 * Acción que se ejecuta cuando se han cargado más productos exitosamente.
 */
export const loadMoreProductsSuccess = createAction(
  '[Product] Load More Products Success',
  props<{ products: Product[] }>()
);

/**
 * Acción para actualizar el estado de un producto (aprobado, rechazado o pendiente).
 */
export const updateProductStatus = createAction(
  '[Product] Update Product Status',
  props<{ product: Product }>()
);

/**
 * Acción para eliminar un producto por su ID.
 */
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);
