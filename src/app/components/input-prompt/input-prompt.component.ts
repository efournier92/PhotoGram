import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

export interface DialogData {
  promptMessage: string,
}

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.scss'],
})
export class InputPromptComponent implements OnInit {
  photoDescription: string;

  constructor(
    public dialogRef: MatDialogRef<InputPromptComponent>,
  ) { }

  ngOnInit(): void { }

  onConfirm(photoDescription: string): void {
    this.dialogRef.close(photoDescription);
  }
}
