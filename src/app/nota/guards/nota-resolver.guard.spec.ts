import { TestBed } from '@angular/core/testing';

import { NotaResolverGuard } from './nota-resolver.guard';

describe('CursoResolverGuard', () => {
  let guard: NotaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
