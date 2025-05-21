import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinesAddFormComponent } from './magazines-add-form.component';

describe('MagazinesAddFormComponent', () => {
  let component: MagazinesAddFormComponent;
  let fixture: ComponentFixture<MagazinesAddFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MagazinesAddFormComponent]
    });
    fixture = TestBed.createComponent(MagazinesAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
