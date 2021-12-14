/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotaTagService } from './notaTag.service';

describe('Service: NotaTag', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotaTagService]
    });
  });

  it('should ...', inject([NotaTagService], (service: NotaTagService) => {
    expect(service).toBeTruthy();
  }));
});
