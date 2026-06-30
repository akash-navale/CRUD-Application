import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallCrud } from './api-call-crud';

describe('ApiCallCrud', () => {
  let component: ApiCallCrud;
  let fixture: ComponentFixture<ApiCallCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCallCrud],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiCallCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
