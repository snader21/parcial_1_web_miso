/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { HttpClientModule } from '@angular/common/http';
import { CoffeeComponent } from './coffee.component';
import { CoffeeService } from './coffee.service';
import { Coffee } from './coffee';

faker.locale = 'es';

describe('CoffeeListComponent', () => {
  let component: CoffeeComponent;
  let fixture: ComponentFixture<CoffeeComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CoffeeComponent],
      providers: [CoffeeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeComponent);
    component = fixture.componentInstance;

    component.coffees = Array.from({ length: 3 }, () => {
      const id = faker.datatype.number();
      const nombre = faker.commerce.productName();
      const tipo = faker.helpers.arrayElement(['Blend', 'Café de Origen']);
      const region = faker.address.state();
      const sabor = faker.helpers.arrayElement([
        'cítrico',
        'frutal',
        'chocolate',
        'caramelo',
        'nuez',
        'floral',
        'miel',
      ]);
      const altura = faker.datatype.float({ min: 1000, max: 2500 });
      const imagen = faker.image.imageUrl();
      return new Coffee(id, nombre, tipo, region, sabor, altura, imagen);
    });
    component.updateCounts();

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table', () => {
    expect(debug.query(By.css('tbody')).childNodes.length).toBeGreaterThan(0);
  });

  it('should have 3 rows in the table', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(3);
  });

  it('should display the correct title', () => {
    const titleElement = debug.query(By.css('.title')).nativeElement;
    expect(titleElement.textContent).toContain('El aroma mágico');
  });

  it('should display the correct image', () => {
    const imageElement = debug.query(By.css('.img-fluid')).nativeElement;
    expect(imageElement.getAttribute('src')).toContain(
      '../../assets/image 1.png'
    );
    expect(imageElement.getAttribute('alt')).toContain('Imágen de café');
  });

  it('should display the correct contact information in the footer', () => {
    const footerElement = debug.query(By.css('footer p')).nativeElement;
    expect(footerElement.textContent).toContain(
      'Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico'
    );
  });

  it('should display the total number of coffee blends and origin coffees correctly', () => {
    const originNumElement = debug.query(By.css('#total1')).nativeElement;
    const blendNumElement = debug.query(By.css('#total2')).nativeElement;

    const originNum = component.coffees.filter(
      (coffee) => coffee.tipo === 'Café de Origen'
    ).length;
    const blendNum = component.coffees.filter(
      (coffee) => coffee.tipo === 'Blend'
    ).length;

    expect(originNumElement.textContent).toContain(
      `Total café de origen: ${originNum}`
    );
    expect(blendNumElement.textContent).toContain(
      `Total café blend: ${blendNum}`
    );
  });

  it('should have the correct number of columns in the table', () => {
    const columns = debug.queryAll(By.css('thead th'));
    expect(columns.length).toBe(4);
  });

  it('should display the correct column headers', () => {
    const columnHeaders = debug
      .queryAll(By.css('thead th'))
      .map((header) => header.nativeElement.textContent);

    expect(columnHeaders).toEqual(['#', 'Nombre', 'Tipo', 'Región']);
  });

  it('should display the generated data correctly in the table body', () => {
    const rows = debug.queryAll(By.css('tbody tr'));

    rows.forEach((row, rowIndex) => {
      const columns = row
        .queryAll(By.css('th, td'))
        .map((column) => column.nativeElement.textContent.trim());

      const coffee = component.coffees[rowIndex];
      expect(columns).toEqual([
        coffee.id.toString(),
        coffee.nombre,
        coffee.tipo,
        coffee.region,
      ]);
    });
  });
});
