import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import * as ProductActions from './product.actions';

// Estado inicial de los productos
export interface ProductState {
  products: Product[];      // Lista de productos
  loading: boolean;         // Indicador de carga de productos
  loadingMore: boolean;     // Indicador de carga de más productos
}

// Estado inicial con productos vacíos y ambos indicadores en falso
export const initialState: ProductState = {
  products: [],
  loading: false,
  loadingMore: false
};

// Reducer que maneja las acciones relacionadas con productos
export const productReducer = createReducer(
  initialState,

  /**
   * Acción: loadProducts
   * Al dispararse, se establece 'loading' en true para indicar que los productos están siendo cargados.
   */
  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true
  })),

  /**
   * Acción: loadProductsSuccess
   * Al dispararse, se actualiza el estado con los productos cargados y se establece 'loading' en false.
   */
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,          // Se actualiza la lista de productos con los nuevos productos
    loading: false     // Se cambia el indicador de carga a false
  })),

  /**
   * Acción: loadMoreProducts
   * Al dispararse, se establece 'loadingMore' en true para indicar que se están cargando más productos.
   */
  on(ProductActions.loadMoreProducts, state => ({
    ...state,
    loadingMore: true
  })),

  /**
   * Acción: loadMoreProductsSuccess
   * Al dispararse, se añaden los nuevos productos a la lista de productos existentes y se establece 'loadingMore' en false.
   */
  on(ProductActions.loadMoreProductsSuccess, (state, { products }) => ({
    ...state,
    products: [...state.products, ...products],  // Se concatenan los productos nuevos con los existentes
    loadingMore: false  // Se cambia el indicador de carga de productos adicionales a false
  })),

  /**
   * Acción: updateProductStatus
   * Al dispararse, se actualiza el estado del producto en la lista.
   * Si el producto existe, se reemplaza con la versión actualizada.
   */
  on(ProductActions.updateProductStatus, (state, { product }) => ({
    ...state,
    products: state.products.map(p => 
      p.id === product.id ? product : p  // Reemplaza el producto si se encuentra por su ID
    )
  })),

  /**
   * Acción: deleteProduct
   * Al dispararse, se elimina el producto de la lista basado en su ID.
   */
  on(ProductActions.deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id)  // Filtra el producto a eliminar por su ID
  }))
);
