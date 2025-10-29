// ...existing code...
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth-guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => {
      const guard = TestBed.inject(AuthGuard);
      return (guard as any).canActivate?.(...guardParameters);
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
    });
  });

  it('should be created', () => {
    const guard = TestBed.inject(AuthGuard);
    expect(guard).toBeTruthy();
  });
});
