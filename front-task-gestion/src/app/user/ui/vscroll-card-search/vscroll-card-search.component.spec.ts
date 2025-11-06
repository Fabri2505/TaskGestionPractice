import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VscrollCardSearchComponent } from './vscroll-card-search.component';

describe('VscrollCardSearchComponent', () => {
  let component: VscrollCardSearchComponent;
  let fixture: ComponentFixture<VscrollCardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VscrollCardSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VscrollCardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
