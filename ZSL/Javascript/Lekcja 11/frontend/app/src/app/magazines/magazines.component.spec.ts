import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinesComponent } from './magazines.component';

describe('MagazinesComponent', () => {
  let component: MagazinesComponent;
  let fixture: ComponentFixture<MagazinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazinesComponent]
    });
    fixture = TestBed.createComponent(MagazinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
