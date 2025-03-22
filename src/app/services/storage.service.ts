import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' // Proporciona este servicio a toda la aplicación sin necesidad de importarlo en módulos específicos.
})
export class StorageService {
  private readonly STORAGE_KEY = 'checkmaster_products'; // Clave utilizada para almacenar los productos en el localStorage.

  constructor() {
    this.initializeDB(); // Se inicializa la base de datos local en el constructor.
  }

  /**
   * Verifica si hay datos almacenados en localStorage.
   * Si no los hay, inicializa el almacenamiento con un array vacío.
   */
  private initializeDB(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([])); // Se almacena un array vacío en localStorage.
    }
  }

  /**
   * Obtiene los productos almacenados en localStorage.
   * @returns Un array de productos.
   */
  getProducts(): Product[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'); // Convierte los datos almacenados en un array de productos.
  }

  /**
   * Guarda un array de productos en localStorage.
   * @param products - Lista de productos a guardar.
   */
  saveProducts(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products)); // Convierte los productos a string y los guarda en localStorage.
  }

  /**
   * Actualiza un producto en localStorage si ya existe.
   * @param product - Producto actualizado.
   */
  updateProduct(product: Product): void {
    const products = this.getProducts(); // Obtiene los productos almacenados.
    const index = products.findIndex(p => p.id === product.id); // Busca el índice del producto a actualizar.

    if (index !== -1) {
      products[index] = product; // Reemplaza el producto existente con el actualizado.
      this.saveProducts(products); // Guarda la lista de productos actualizada.
    }
  }

  /**
   * Elimina un producto del almacenamiento local.
   * @param id - ID del producto a eliminar.
   */
  deleteProduct(id: number): void {
    const products = this.getProducts(); // Obtiene los productos almacenados.
    this.saveProducts(products.filter(p => p.id !== id)); // Filtra el producto a eliminar y guarda la lista actualizada.
  }
}
