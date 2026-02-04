import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityBadge } from './amenity-badge';

describe('AmenityBadge', () => {
  let component: AmenityBadge;
  let fixture: ComponentFixture<AmenityBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmenityBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmenityBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
