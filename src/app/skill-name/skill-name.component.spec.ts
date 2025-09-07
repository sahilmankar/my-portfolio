import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillNameComponent } from './skill-name.component';

describe('SkillNameComponent', () => {
  let component: SkillNameComponent;
  let fixture: ComponentFixture<SkillNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
