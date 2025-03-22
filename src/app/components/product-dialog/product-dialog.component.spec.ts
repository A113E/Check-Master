import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDialogComponent } from './product-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Para el diálogo de Material
import { MatButtonModule } from '@angular/material/button'; // Para los botones de Material
import { CommonModule } from '@angular/common'; // Para directivas comunes de Angular
import { Inject } from '@angular/core'; // Para la inyección de dependencias

describe('ProductDialogComponent', () => {
  let component: ProductDialogComponent;
  let fixture: ComponentFixture<ProductDialogComponent>;

  // Datos de prueba para un producto
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'Test Product Description',
    status: 'approved',
    createdAt: new Date()
  };

  // Se prepara el entorno de prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDialogComponent], // Declaramos el componente a probar
      imports: [CommonModule, MatDialogModule, MatButtonModule], // Importamos los módulos necesarios de Angular Material
      providers: [
        {
          provide: MAT_DIALOG_DATA, // Inyectamos los datos del producto en el diálogo
          useValue: mockProduct
        }
      ]
    }).compileComponents();
  });

  // Antes de cada prueba, configuramos el componente
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectamos cambios en el componente
  });

  // Test 1: Verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verifica si el producto recibido en los datos es correcto
  it('should receive product data via MAT_DIALOG_DATA', () => {
    // Verificamos que el producto recibido tenga los mismos datos que mockProduct
    expect(component.product).toEqual(mockProduct);
  });

  // Test 3: Verifica que el título del producto se muestre correctamente en la plantilla
  it('should display the product title in the dialog', () => {
    // Obtener el título del producto en el diálogo
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2'); // Suponemos que el título está dentro de un <h2>
    expect(titleElement?.textContent).toBe(mockProduct.title); // Verificamos que el título sea el correcto
  });

  // Test 4: Verifica que la descripción del producto se muestre correctamente en la plantilla
  it('should display the product description in the dialog', () => {
    // Obtener la descripción del producto en el diálogo
    const compiled = fixture.nativeElement as HTMLElement;
    const descriptionElement = compiled.querySelector('.product-description'); // Suponemos que la descripción tiene esta clase
    expect(descriptionElement?.textContent).toBe(mockProduct.description); // Verificamos que la descripción sea la correcta
  });

  // Test 5: Verifica que el botón cierre correctamente el diálogo
  it('should close the dialog when close button is clicked', () => {
    // Espiamos el método close() del MatDialog
    const closeSpy = spyOn(component, 'close');
    
    // Simulamos el click en el botón de cierre (suponiendo que tenga la clase .close-button)
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('.close-button') as HTMLElement;
    button.click();
    
    // Verificamos que el método close haya sido llamado
    expect(closeSpy).toHaveBeenCalled();
  });
});
