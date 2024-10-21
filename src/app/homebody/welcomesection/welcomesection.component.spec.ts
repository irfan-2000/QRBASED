import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomesectionComponent } from './welcomesection.component';

describe('WelcomesectionComponent', () => {
  let component: WelcomesectionComponent;
  let fixture: ComponentFixture<WelcomesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomesectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
