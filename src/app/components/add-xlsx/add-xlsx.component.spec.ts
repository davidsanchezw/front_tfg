import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddXlsxComponent } from './add-xlsx.component';

describe('AddXlsxComponent', () => {
  let component: AddXlsxComponent;
  let fixture: ComponentFixture<AddXlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddXlsxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
