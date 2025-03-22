// Importa los decoradores y funcionalidades necesarias desde Angular
import { Component, OnInit, HostListener } from '@angular/core';

// Importa el CommonModule para directivas como *ngIf y *ngFor
import { CommonModule } from '@angular/common';

// Importa módulos de Angular Material para UI (tarjetas, checkboxes y botones)
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

// Importa Store de NgRx para la gestión del estado global
import { Store } from '@ngrx/store';

// Importa el modelo de Producto
import { Product } from '../../models/product.model';

// Importa las acciones de NgRx para manejar los productos
import * as ProductActions from '../../store/product.actions';

// Importa el componente de diálogo para mostrar detalles de un producto
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

// Importa MatDialog para manejar modales (diálogos emergentes)
import { MatDialog } from '@angular/material/dialog';

// Definición del componente
@Component({
  selector: 'app-product-list', // Selector del componente
  standalone: true, // Indica que el componente es independiente y no requiere un módulo
  imports: [
    CommonModule, // Directivas básicas de Angular
    MatCardModule, // Tarjetas de Angular Material
    MatCheckboxModule, // Checkbox de Angular Material
    MatButtonModule // Botones de Angular Material
  ],
  templateUrl: './product-list.component.html', // Plantilla HTML del componente
  styleUrls: ['./product-list.component.scss']  // Archivo de estilos específico del componente
})
export class ProductListComponent implements OnInit {
  // Obtiene la lista de productos desde el store de NgRx
  products$ = this.store.select(state => state.products.products);

  // Controla la paginación de productos en la carga inicial y al hacer scroll
  private offset = 10; // Inicialmente cargamos 10 productos
  private limit = 7;  // Cargamos 7 productos adicionales en cada carga

  // Inyecta el store de NgRx y el servicio de diálogos de Angular Material
  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    // Llama a la acción de NgRx para cargar los primeros 10 productos
    this.store.dispatch(ProductActions.loadProducts({ limit: 10, offset: 0 }));
  }

  // Detecta el evento de scroll en la ventana del navegador
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = window.innerHeight; // Altura visible de la ventana
    const documentHeight = document.documentElement.scrollHeight; // Altura total del documento
    const scrollPosition = window.scrollY; // Posición actual del scroll

    // Si el usuario está cerca del final de la página, carga más productos
    if (documentHeight - (windowHeight + scrollPosition) < 50) {
      this.loadMoreProducts();
    }
  }

  // Carga más productos y actualiza el offset para futuras cargas
  loadMoreProducts() {
    this.store.dispatch(ProductActions.loadMoreProducts({ limit: this.limit, offset: this.offset }));
    this.offset += this.limit; // Aumenta el offset para la próxima carga
  }

  // Marca un producto como aprobado o en estado pendiente
  approveProduct(product: Product, approved: boolean) {
    this.store.dispatch(ProductActions.updateProductStatus({
      product: {
        ...product,
        status: approved ? 'aprobado' : 'pendiente'
      }
    }));
  }

  // Marca un producto como rechazado o en estado pendiente
  rejectProduct(product: Product, rejected: boolean) {
    this.store.dispatch(ProductActions.updateProductStatus({
      product: {
        ...product,
        status: rejected ? 'rechazado' : 'pendiente'
      }
    }));
  }

  // Abre un diálogo modal con los detalles del producto seleccionado
  openDetails(product: Product) {
    this.dialog.open(ProductDialogComponent, {
      data: product, // Pasa los datos del producto al diálogo
      width: '400px' // Define el ancho del modal
    });
  }
}
