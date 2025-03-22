// Importa la función bootstrapApplication para iniciar la aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser';

// Importa el decorador Component de Angular para definir un componente
import { Component } from '@angular/core';

// Importa el proveedor para realizar solicitudes HTTP en Angular
import { provideHttpClient } from '@angular/common/http';

// Importa el proveedor para habilitar animaciones en la aplicación
import { provideAnimations } from '@angular/platform-browser/animations';

// Importaciones de NgRx para manejar el estado global de la aplicación
import { provideStore } from '@ngrx/store'; // Proporciona la store global
import { provideEffects } from '@ngrx/effects'; // Proporciona efectos para manejar lógica asíncrona
import { provideStoreDevtools } from '@ngrx/store-devtools'; // Herramientas de desarrollo para depuración de la store

// Importa el reducer que maneja el estado de los productos en el store de NgRx
import { productReducer } from './app/store/product.reducer';

// Importa los efectos asociados a los productos para manejar acciones asíncronas
import { ProductEffects } from './app/store/product.effects';

// Importaciones de Angular Material para el diseño de la interfaz
import { MatToolbarModule } from '@angular/material/toolbar'; // Módulo de barra de herramientas
import { MatTabsModule } from '@angular/material/tabs'; // Módulo de pestañas

// Importa los componentes que se usarán dentro de la aplicación
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ReviewedProductsComponent } from './app/components/reviewed-products/reviewed-products.component';

// Define el componente principal de la aplicación
@Component({
  selector: 'app-root', // Define el selector del componente raíz
  standalone: true, // Indica que este componente es independiente y no necesita un módulo para declararse
  imports: [
    MatToolbarModule, // Importa el módulo de la barra de herramientas
    MatTabsModule, // Importa el módulo de pestañas
    ProductListComponent, // Importa el componente de la lista de productos por revisar
    ReviewedProductsComponent // Importa el componente de los productos revisados
  ],
  templateUrl: './app.component.html' // Importa el template App.component
})
export class App {} // Declara la clase del componente principal

// Inicia la aplicación Angular con el componente App y proporciona los servicios necesarios
bootstrapApplication(App, {
  providers: [
    provideHttpClient(), // Habilita el cliente HTTP en la aplicación
    provideAnimations(), // Activa las animaciones en la aplicación
    provideStore({ products: productReducer }), // Configura el store con el reducer de productos
    provideEffects([ProductEffects]), // Configura los efectos para manejar acciones asíncronas en el store
    provideStoreDevtools() // Habilita las herramientas de desarrollo para la depuración del store
  ]
});
