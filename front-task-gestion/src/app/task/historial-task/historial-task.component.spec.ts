import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTaskComponent } from './historial-task.component';

describe('HistorialTaskComponent', () => {
  let component: HistorialTaskComponent;
  let fixture: ComponentFixture<HistorialTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
