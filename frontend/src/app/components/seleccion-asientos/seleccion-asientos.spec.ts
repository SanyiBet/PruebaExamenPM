import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionAsientos } from './seleccion-asientos';

describe('SeleccionAsientos', () => {
  let component: SeleccionAsientos;
  let fixture: ComponentFixture<SeleccionAsientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionAsientos],
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionAsientos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
