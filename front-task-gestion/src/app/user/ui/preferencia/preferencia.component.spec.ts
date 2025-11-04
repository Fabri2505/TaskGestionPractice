import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaComponent } from './preferencia.component';

describe('PreferenciaComponent', () => {
  let component: PreferenciaComponent;
  let fixture: ComponentFixture<PreferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
