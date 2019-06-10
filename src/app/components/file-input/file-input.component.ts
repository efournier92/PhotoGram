import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

interface HTMLInput extends HTMLElement {
  value: any;
  files: any;
}

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements OnInit {
  fileInput: HTMLInput;
  @Input()
  inputMessage: string;
  @Output()
  onInputFileChange: EventEmitter<HTMLInput> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.fileInput = document.getElementById('file-input-file') as HTMLInput;
  }

  openFileSelect(): any {
    this.fileInput.click();
  }

  onInputChange(): void {
    this.onInputFileChange.emit(this.fileInput.files);
  }

  shouldAllowCancel(): boolean {
    if (this.fileInput && this.fileInput.files && this.fileInput.files.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
