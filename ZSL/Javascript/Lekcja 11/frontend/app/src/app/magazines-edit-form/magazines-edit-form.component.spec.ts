import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinesEditFormComponent } from './magazines-edit-form.component';

describe('MagazinesEditFormComponent', () => {
  let component: MagazinesEditFormComponent;
  let fixture: ComponentFixture<MagazinesEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazinesEditFormComponent]
    });
    fixture = TestBed.createComponent(MagazinesEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
