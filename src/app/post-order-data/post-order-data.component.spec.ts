import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOrderDataComponent } from './post-order-data.component';

describe('PostOrderDataComponent', () => {
  let component: PostOrderDataComponent;
  let fixture: ComponentFixture<PostOrderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostOrderDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOrderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
