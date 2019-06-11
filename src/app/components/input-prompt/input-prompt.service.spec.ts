import { TestBed, inject } from '@angular/core/testing';
import { InputPromptService } from './input-prompt.service';

describe('ConfirmPromptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputPromptService]
    });
  });

  it('should be created', inject([InputPromptService], (service: InputPromptService) => {
    expect(service).toBeTruthy();
  }));
});
