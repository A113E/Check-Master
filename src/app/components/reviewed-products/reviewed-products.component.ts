// Importa los decoradores y funcionalidades necesarias desde Angular
import { Component } from '@angular/core';

// Importa CommonModule para poder usar directivas como *ngIf y *ngFor en la plantilla
import { CommonModule } from '@angular/common';

// Importa módulos de Angular Material para la UI (tarjetas, botones y chips)
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

// Importa Store de NgRx para la gestión del estado global
import { Store } from '@ngrx/store';

// Importa el modelo de Producto
import { Product } from '../../models/product.model';

// Importa las acciones de NgRx para manejar los productos
import * as ProductActions from '../../store/product.actions';

// Definición del componente
@Component({
  selector: 'app-reviewed-products', // Selector del componente
  standalone: true, // Indica que el componente es independiente y no requiere un módulo
  imports: [
    CommonModule, // Directivas básicas de Angular
    MatCardModule, // Tarjetas de Angular Material
    MatButtonModule, // Botones de Angular Material
    MatChipsModule // Chips de Angular Material (para mostrar etiquetas visuales)
  ],
  templateUrl: './reviewed-products.component.html', // Plantilla HTML del componente
  styleUrls: ['./reviewed-products.component.scss']  // Archivo de estilos del componente
})
export class ReviewedProductsComponent {
  // Obtiene los productos revisados desde el store de NgRx
  // Se filtran aquellos productos que NO tienen el estado 'pending'
  reviewedProducts$ = this.store.select(state => 
    state.products.products.filter((p: { status: string }) => p.status !== 'pending')
  );

  // Inyecta el store de NgRx para gestionar el estado global
  constructor(private store: Store<any>) {}

  // Elimina un producto del estado global despachando una acción
  deleteProduct(id: number) {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
  }
}
