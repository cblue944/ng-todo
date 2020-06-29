import { TestBed } from '@angular/core/testing';

import { Todos.Firebase.ServiceService } from './todos.firebase.service.service';

describe('Todos.Firebase.ServiceService', () => {
  let service: Todos.Firebase.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Todos.Firebase.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
