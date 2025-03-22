// Importa las herramientas necesarias para las pruebas
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductDialogComponent } from './product-dialog.component';
import { Product } from '../../models/product.model';

// Describe el conjunto de pruebas para el componente ProductDialogComponent
describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent; // Instancia del componente
  let fixture: ComponentFixture<ProductDialogComponent>; // Fixture para manejar el componente

  // Configura el entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      declarations: [ProductDialogComponent], // Declara el componente a probar
      imports: [
        CommonModule, // Importa CommonModule para directivas como *ngIf y *ngFor
        MatDialogModule, // Importa MatDialogModule para manejar diálogos
        MatButtonModule, // Importa MatButtonModule para los botones
      ],
      providers: [
        // Proporciona los datos simulados para el diálogo
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            title: 'Test Product',
            description: 'Test Description',
            status: 'pendiente',
            createdAt: new Date(),
          } as Product, // Simula los datos del producto
        },
      ],
    }).compileComponents(); // Compila el componente y sus dependencias

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;

    // Inicializa el componente
    fixture.detectChanges();
  });

  // Prueba: Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Asegura que el componente se haya creado
  });

  // Prueba: Verifica que los datos del producto se inyectan correctamente
  it('should receive product data', () => {
    // Verifica que el producto inyectado coincida con los datos simulados
    expect(component.product).toEqual({
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      status: 'pendiente',
      createdAt: jasmine.any(Date), // Verifica que createdAt sea una instancia de Date
    });
  });
});
