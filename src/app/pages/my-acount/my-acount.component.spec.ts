import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcountComponent } from './my-acount.component';

describe('MyAcountComponent', () => {
  let component: MyAcountComponent;
  let fixture: ComponentFixture<MyAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAcountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
