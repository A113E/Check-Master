import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import * as ProductActions from '../../store/product.actions';
import { of } from 'rxjs';

// Mocks del servicio MatDialog
class MatDialogMock {
  open() {
    return { afterClosed: () => of(true) }; // Simula que el diálogo se cierra
  }
}

// Descripción de las pruebas del componente ProductListComponent
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: Store<any>;
  let matDialog: MatDialogMock;

  beforeEach(() => {
    // Configura el TestBed para el componente
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        StoreModule.forRoot({}), // Simula el store
        MatDialogModule, // Importa el módulo para el manejo de diálogos
        CommonModule, // Directivas comunes de Angular
        MatCardModule, // Módulo para tarjetas de Material
        MatCheckboxModule, // Módulo para checkboxes de Material
        MatButtonModule // Módulo para botones de Material
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }, // Proporciona el mock de MatDialog
      ]
    }).compileComponents();

    // Obtiene las instancias necesarias del componente y el store
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    matDialog = TestBed.inject(MatDialog);
  });

  // Prueba de inicialización del componente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });

  // Prueba de la acción de carga inicial de productos
  it('should dispatch loadProducts action on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch'); // Espía en el método dispatch
    component.ngOnInit(); // Llama al método ngOnInit
    expect(dispatchSpy).toHaveBeenCalledWith(ProductActions.loadProducts({ limit: 10, offset: 0 })); // Verifica que se haya disparado la acción correspondiente
  });

  // Prueba del comportamiento del scroll para cargar más productos
  it('should dispatch loadMoreProducts action on scroll', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    // Simula el evento de scroll acercándose al final de la página
    const scrollEvent = new Event('scroll');
    window.innerHeight = 500;
    document.documentElement.scrollHeight = 1000;
    window.scrollY = 450;
    component.onScroll(); // Llama al método onScroll
    expect(dispatchSpy).toHaveBeenCalledWith(ProductActions.loadMoreProducts({ limit: 7, offset: 10 }));
  });

  // Prueba del método approveProduct
  it('should dispatch updateProductStatus action to approve product', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const product: Product = { id: 1, title: 'Product 1', description: 'Description', createdAt: new Date() };
    component.approveProduct(product, true); // Llama al método approveProduct
    expect(dispatchSpy).toHaveBeenCalledWith(ProductActions.updateProductStatus({
      product: { ...product, status: 'approved' }
    }));
  });

  // Prueba del método rejectProduct
  it('should dispatch updateProductStatus action to reject product', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const product: Product = { id: 1, title: 'Product 1', description: 'Description', createdAt: new Date() };
    component.rejectProduct(product, true); // Llama al método rejectProduct
    expect(dispatchSpy).toHaveBeenCalledWith(ProductActions.updateProductStatus({
      product: { ...product, status: 'rejected' }
    }));
  });

  // Prueba de la apertura del diálogo para ver los detalles del producto
  it('should open dialog with product details', () => {
    const product: Product = { id: 1, title: 'Product 1', description: 'Description', createdAt: new Date() };
    const openSpy = spyOn(matDialog, 'open').and.callThrough(); // Espía en el método open de MatDialog
    component.openDetails(product); // Llama al método openDetails
    expect(openSpy).toHaveBeenCalled(); // Verifica que se haya llamado al método open
  });

});
