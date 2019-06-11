import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  promptMessage: string;

  constructor(
    public dialogRef: MatDialogRef<InputPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.promptMessage = this.data.promptMessage;
  }

  onConfirm(photoDescription: string) {
    this.dialogRef.close(photoDescription);
  }
}
