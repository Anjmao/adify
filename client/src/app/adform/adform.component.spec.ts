import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdformComponent } from './adform.component';

describe('AdformComponent', () => {
  let component: AdformComponent;
  let fixture: ComponentFixture<AdformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
