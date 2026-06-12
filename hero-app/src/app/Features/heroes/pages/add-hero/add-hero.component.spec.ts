import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroComponent } from './add-hero.component';

describe('AddHero', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
