import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserComponent } from './superuser.component';

describe('SuperuserComponent', () => {
  let component: SuperuserComponent;
  let fixture: ComponentFixture<SuperuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperuserComponent]
    });
    fixture = TestBed.createComponent(SuperuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
