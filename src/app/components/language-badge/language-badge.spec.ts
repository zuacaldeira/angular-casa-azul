import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageBadge } from './language-badge';

describe('LanguageBadge', () => {
  let component: LanguageBadge;
  let fixture: ComponentFixture<LanguageBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
