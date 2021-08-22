import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponseFinalComponent } from './create-response-final.component';

describe('CreateResponseFinalComponent', () => {
  let component: CreateResponseFinalComponent;
  let fixture: ComponentFixture<CreateResponseFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateResponseFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResponseFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
