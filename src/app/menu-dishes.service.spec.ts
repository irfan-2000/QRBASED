import { TestBed } from '@angular/core/testing';

import { MenuDishesService } from './menu-dishes.service';

describe('MenuDishesService', () => {
  let service: MenuDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
