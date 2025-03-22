// Importaciones necesarias para configurar y ejecutar pruebas unitarias en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas para pruebas de componentes.
import { Store } from '@ngrx/store'; // Importación de Store de NgRx para gestionar el estado global.
import { of } from 'rxjs'; // Importación de RxJS para trabajar con Observables.
import { MatDialog } from '@angular/material/dialog'; // Importación de MatDialog para manejar cuadros de diálogo en Angular Material.
import { ProductListComponent } from './product-list.component'; // Importación del componente a probar.
import { Product } from '../../models/product.model'; // Modelo de datos de productos.
import * as ProductActions from '../../store/product.actions'; // Importación de las acciones de NgRx para productos.
import { MatCardModule } from '@angular/material/card'; // Módulo de Angular Material para tarjetas.
import { MatCheckboxModule } from '@angular/material/checkbox'; // Módulo de Angular Material para checkboxes.
import { MatButtonModule } from '@angular/material/button'; // Módulo de Angular Material para botones.
import { CommonModule } from '@angular/common'; // Importación de CommonModule para características comunes de Angular.
import { ProductDialogComponent } from '../product-dialog/product-dialog.component'; // Importación del componente de diálogo.

describe('ProductListComponent', () => {
  let component: ProductListComponent; // Variable para almacenar la instancia del componente.
  let fixture: ComponentFixture<ProductListComponent>; // Variable para manejar el fixture del componente (su instancia en pruebas).
  let store: Store; // Variable para representar el Store de NgRx.
  let dialog: MatDialog; // Variable para manejar el servicio de diálogos de Angular Material.

  beforeEach(async () => {
    // Creación de un mock para el Store de NgRx.
    const storeMock = {
      select: jasmine.createSpy().and.returnValue(of([])), // Simula la selección de datos desde el estado.
      dispatch: jasmine.createSpy(), // Simula el envío de acciones al Store.
    };

    // Creación de un mock para el servicio de diálogos de Angular Material.
    const dialogMock = {
      open: jasmine.createSpy(), // Simula la apertura de un cuadro de diálogo.
    };

    // Configuración del entorno de pruebas.
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductDialogComponent], // Declaración de los componentes a probar.
      imports: [
        CommonModule, // Módulo de funcionalidades comunes.
        MatCardModule, // Módulo de tarjetas.
        MatCheckboxModule, // Módulo de checkboxes.
        MatButtonModule, // Módulo de botones.
      ],
      providers: [
        { provide: Store, useValue: storeMock }, // Se provee el mock del Store en lugar del real.
        { provide: MatDialog, useValue: dialogMock }, // Se provee el mock de MatDialog en lugar del real.
      ],
    }).compileComponents(); // Compila los componentes antes de ejecutar las pruebas.

    fixture = TestBed.createComponent(ProductListComponent); // Se crea una instancia del componente en el entorno de pruebas.
    component = fixture.componentInstance; // Se obtiene la instancia del componente.
    store = TestBed.inject(Store); // Se obtiene la instancia del Store de NgRx.
    dialog = TestBed.inject(MatDialog); // Se obtiene la instancia de MatDialog.
    fixture.detectChanges(); // Se ejecuta la detección de cambios en el componente.
  });

  // Prueba para verificar si el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente no sea nulo o indefinido.
  });

  // Prueba para verificar que se cargan productos al inicializar el componente.
  it('should load products on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.loadProducts({ limit: 10, offset: 0 }) // Se espera que se despache la acción de cargar productos.
    );
  });

  // Prueba para verificar que se cargan más productos cuando se hace scroll.
  it('should load more products on scroll', () => {
    component.onScroll(); // Se llama a la función onScroll del componente.
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.loadMoreProducts({ limit: 7, offset: 10 }) // Se espera que se despache la acción de cargar más productos.
    );
    expect(component['offset']).toBe(17); // Se espera que el offset del componente se haya actualizado.
  });

  // Prueba para verificar que se aprueba un producto correctamente.
  it('should approve a product', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      status: 'pendiente',
      createdAt: new Date(),
    };

    component.approveProduct(product, true); // Se aprueba el producto.
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.updateProductStatus({
        product: { ...product, status: 'aprobado' }, // Se espera que el estado del producto cambie a "approved".
      })
    );
  });

  // Prueba para verificar que se rechaza un producto correctamente.
  it('should reject a product', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      status: 'pendiente',
      createdAt: new Date(),
    };

    component.rejectProduct(product, true); // Se rechaza el producto.
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.updateProductStatus({
        product: { ...product, status: 'rechazado' }, // Se espera que el estado del producto cambie a "rejected".
      })
    );
  });

  // Prueba para verificar que se abre el cuadro de diálogo de detalles del producto.
  it('should open product details dialog', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      status: 'pendiente',
      createdAt: new Date(),
    };

    component.openDetails(product); // Se llama al método que abre el diálogo.
    expect(dialog.open).toHaveBeenCalledWith(ProductDialogComponent, {
      data: product, // Se espera que el diálogo reciba el producto como dato.
      width: '400px', // Se espera que el diálogo tenga un ancho de 400px.
    });
  });
});

