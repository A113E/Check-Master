// Importa las herramientas necesarias para las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReviewedProductsComponent } from './reviewed-products.component';
import { Product } from '../../models/product.model';
import * as ProductActions from '../../store/product.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

// Describe el conjunto de pruebas para el componente ReviewedProductsComponent
describe('ReviewedProductsComponent', () => {
  let component: ReviewedProductsComponent; // Instancia del componente
  let fixture: ComponentFixture<ReviewedProductsComponent>; // Fixture para manejar el componente
  let store: Store; // Mock del store de NgRx
  let dialog: MatDialog; // Mock del servicio de diálogo

  // Configura el entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    // Crea un mock del Store
    const storeMock = {
      select: jasmine.createSpy().and.returnValue(of([])), // Simula la selección de productos
      dispatch: jasmine.createSpy(), // Simula el despacho de acciones
    };

    // Crea un mock del MatDialog
    const dialogMock = {
      open: jasmine.createSpy(), // Simula la apertura de un diálogo
    };

    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [ReviewedProductsComponent, ProductDialogComponent], // Declara el componente a probar
      imports: [
        CommonModule, // Importa CommonModule para directivas como *ngIf y *ngFor
        MatCardModule, // Importa MatCardModule para las tarjetas de productos
        MatButtonModule, // Importa MatButtonModule para los botones
        MatChipsModule, // Importa MatChipsModule para los chips
      ],
      providers: [
        { provide: Store, useValue: storeMock }, // Proporciona el mock del Store
        { provide: MatDialog, useValue: dialogMock }, // Proporciona el mock del MatDialog
      ],
    }).compileComponents(); // Compila el componente y sus dependencias

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(ReviewedProductsComponent);
    component = fixture.componentInstance;

    // Obtiene las instancias de los servicios mockeados
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);

    // Inicializa el componente
    fixture.detectChanges();
  });

  // Prueba: Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Asegura que el componente se haya creado
  });

  // Prueba: Verifica que se filtran los productos revisados
  it('should filter reviewed products', () => {
    // Simula la selección de productos desde el store
    const products: Product[] = [
      { id: 1, title: 'Product 1', description: 'Description 1', status: 'aprobado', createdAt: new Date() },
      { id: 2, title: 'Product 2', description: 'Description 2', status: 'rechazado', createdAt: new Date() },
      { id: 3, title: 'Product 3', description: 'Description 3', status: 'pendiente', createdAt: new Date() },
    ];

    // Simula que el store devuelve los productos
    (store.select as jasmine.Spy).and.returnValue(of(products));

    // Llama al método para obtener los productos revisados
    component.reviewedProducts$.subscribe((reviewedProducts) => {
      // Verifica que solo se devuelvan los productos aprobados o rechazados
      expect(reviewedProducts.length).toBe(2); // Solo 2 productos tienen estado diferente de 'pending'
      expect(reviewedProducts).toEqual([
        { id: 1, title: 'Product 1', description: 'Description 1', status: 'aprobado', createdAt: jasmine.any(Date) },
        { id: 2, title: 'Product 2', description: 'Description 2', status: 'rechazado', createdAt: jasmine.any(Date) },
      ]);
    });
  });

  // Prueba: Verifica que se elimina un producto
  it('should delete a product', () => {
    const productId = 1; // ID del producto a eliminar

    // Llama al método para eliminar el producto
    component.deleteProduct(productId);

    // Verifica que se haya despachado la acción para eliminar el producto
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.deleteProduct({ id: productId })
    );
  });

  // Prueba: Verifica que se abre el diálogo de detalles del producto
  it('should open product details dialog', () => {
    const product: Product = {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      status: 'aprobado',
      createdAt: new Date(),
    };

    // Llama al método para abrir el diálogo de detalles
    component.openDetails(product);

    // Verifica que se haya llamado al método open del MatDialog con los datos correctos
    expect(dialog.open).toHaveBeenCalledWith(ProductDialogComponent, {
      data: product,
      width: '400px',
    });
  });
});
