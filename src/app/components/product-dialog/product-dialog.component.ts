// Importa Component e Inject desde Angular para definir un componente e inyectar dependencias
import { Component, Inject } from '@angular/core';

// Importa CommonModule, que proporciona directivas y funcionalidades comunes de Angular
import { CommonModule } from '@angular/common';

// Importa módulos de Angular Material para manejar diálogos y botones
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Importa la interfaz Product, que define la estructura de un producto
import { Product } from '../../models/product.model';

// Define el componente de diálogo para mostrar detalles de un producto
@Component({
  selector: 'app-product-dialog', // Define el selector del componente
  standalone: true, // Indica que este componente es independiente y no requiere declararse en un módulo
  imports: [CommonModule, MatDialogModule, MatButtonModule], // Importa módulos necesarios
  templateUrl: './product-dialog.component.html', // Especifica el archivo de plantilla HTML
})
export class ProductDialogComponent {
  // Inyecta los datos del producto en el diálogo a través de MAT_DIALOG_DATA
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product) {}
}
