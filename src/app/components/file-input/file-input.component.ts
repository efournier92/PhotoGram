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

  onInputChange(): void {
    this.onInputFileChange.emit(this.fileInput.files);
  }
}
