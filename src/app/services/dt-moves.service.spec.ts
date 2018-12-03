import { TestBed } from '@angular/core/testing';

import { DtMovesService } from './dt-moves.service';

describe('DtMovesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DtMovesService = TestBed.get(DtMovesService);
    expect(service).toBeTruthy();
  });
});
