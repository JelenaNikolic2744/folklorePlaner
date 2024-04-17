import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputConcertComponent } from './input-concert.component';

describe('InputConcertComponent', () => {
  let component: InputConcertComponent;
  let fixture: ComponentFixture<InputConcertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputConcertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
