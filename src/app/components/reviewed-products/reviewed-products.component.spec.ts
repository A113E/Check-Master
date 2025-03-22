import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewedProductsComponent } from './reviewed-products.component';
import { StoreModule } from '@ngrx/store'; // Para integrar el store de NgRx
import { MatCardModule } from '@angular/material/card'; // Para usar tarjetas de Angular Material
import { MatButtonModule } from '@angular/material/button'; // Para usar botones de Angular Material
import { MatChipsModule } from '@angular/material/chips'; // Para usar chips de Angular Material
import { provideMockStore, MockStore } from '@ngrx/store/testing'; // Para crear un store simulado
import * as ProductActions from '../../store/product.actions'; // Acciones de productos
import { Product } from '../../models/product.model'; // Modelo de producto

// Describimos el bloque de pruebas para el componente ReviewedProductsComponent
describe('ReviewedProductsComponent', () => {
  let component: ReviewedProductsComponent;
  let fixture: ComponentFixture<ReviewedProductsComponent>;
  let mockStore: MockStore;
  
  // Se prepara el entorno de prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewedProductsComponent], // Componente a probar
      imports: [
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        StoreModule.forRoot({}) // Para integrar el store global
      ],
      providers: [
        provideMockStore() // Crear un store simulado para pruebas
      ]
    }).compileComponents();
  });

  // Antes de cada prueba, configuramos el componente y el store simulado
  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewedProductsComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);

    // Configuramos un valor inicial para el store
    mockStore.setState({
      products: {
        products: [
          { id: 1, title: 'Product 1', description: 'Description 1', status: 'approved', createdAt: new Date() },
          { id: 2, title: 'Product 2', description: 'Description 2', status: 'rejected', createdAt: new Date() },
          { id: 3, title: 'Product 3', description: 'Description 3', status: 'pending', createdAt: new Date() }
        ]
      }
    });
    fixture.detectChanges(); // Detectamos cambios en el componente
  });

  // Test 1: Verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verifica si los productos revisados se filtran correctamente (sin los productos pendientes)
  it('should filter out pending products and display only approved/rejected products', () => {
    component.reviewedProducts$.subscribe((products: Product[]) => {
      expect(products.length).toBe(2); // Deben ser solo 2 productos (aprobados y rechazados)
      expect(products[0].status).toBe('approved');
      expect(products[1].status).toBe('rejected');
    });
  });

  // Test 3: Verifica que la acción deleteProduct se despache correctamente
  it('should dispatch deleteProduct action when deleteProduct is called', () => {
    const productIdToDelete = 1;

    // Espiamos las acciones del store
    spyOn(mockStore, 'dispatch');

    // Llamamos al método deleteProduct
    component.deleteProduct(productIdToDelete);

    // Verificamos que la acción deleteProduct haya sido despachada con el ID correcto
    expect(mockStore.dispatch).toHaveBeenCalledWith(ProductActions.deleteProduct({ id: productIdToDelete }));
  });

  // Test 4: Verifica que la lista de productos se actualiza correctamente después de eliminar un producto
  it('should update the product list after a product is deleted', () => {
    // Establecemos un estado inicial para el store
    mockStore.setState({
      products: {
        products: [
          { id: 1, title: 'Product 1', description: 'Description 1', status: 'approved', createdAt: new Date() },
          { id: 2, title: 'Product 2', description: 'Description 2', status: 'rejected', createdAt: new Date() }
        ]
      }
    });

    fixture.detectChanges(); // Detectamos cambios en el componente

    // Simulamos el borrado de un producto
    component.deleteProduct(1);

    // Verificamos que la lista de productos se haya actualizado y el producto con ID 1 haya sido eliminado
    component.reviewedProducts$.subscribe((products: Product[]) => {
      expect(products.length).toBe(1); // Solo debe quedar un producto
      expect(products[0].id).toBe(2); // El producto con ID 2 debe quedar
    });
  });
});
