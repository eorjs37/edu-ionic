import { TestBed } from '@angular/core/testing';

import { MediaPluginService } from './media-plugin.service';

describe('MediaPluginService', () => {
  let service: MediaPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
