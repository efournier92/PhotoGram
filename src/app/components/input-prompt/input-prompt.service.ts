import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { InputPromptComponent } from './input-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class InputPromptService {

  constructor(
    public dialog: MatDialog,
  ) { }

  public openDialog(): MatDialogRef<InputPromptComponent, any> {
    const dialogRef = this.dialog.open(InputPromptComponent, {
      width: '250px',
    });

    return dialogRef;
  }
}
