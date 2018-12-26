import { TestBed, inject } from '@angular/core/testing';

import { AuthNavigatorService } from './auth-navigator.service';

describe('AuthNavigatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthNavigatorService]
    });
  });

  it('should be created', inject([AuthNavigatorService], (service: AuthNavigatorService) => {
    expect(service).toBeTruthy();
  }));
});
