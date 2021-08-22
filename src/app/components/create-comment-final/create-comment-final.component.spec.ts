import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentFinalComponent } from './create-comment-final.component';

describe('CreateCommentFinalComponent', () => {
  let component: CreateCommentFinalComponent;
  let fixture: ComponentFixture<CreateCommentFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommentFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
