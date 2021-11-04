import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDetalhesComponent } from './nota-detalhes.component';

describe('NotaDetalhesComponent', () => {
  let component: NotaDetalhesComponent;
  let fixture: ComponentFixture<NotaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
