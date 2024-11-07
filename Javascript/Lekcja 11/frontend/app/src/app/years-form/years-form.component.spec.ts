import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsFormComponent } from './years-form.component';

describe('YearsFormComponent', () => {
  let component: YearsFormComponent;
  let fixture: ComponentFixture<YearsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearsFormComponent]
    });
    fixture = TestBed.createComponent(YearsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
