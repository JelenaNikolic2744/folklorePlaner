import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUserMoneyComponent } from './input-user-money.component';

describe('InputUserMoneyComponent', () => {
  let component: InputUserMoneyComponent;
  let fixture: ComponentFixture<InputUserMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputUserMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUserMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
