import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertsComponent } from './show-concerts.component';

describe('ConcertsComponent', () => {
  let component: ConcertsComponent;
  let fixture: ComponentFixture<ConcertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
