import { DialogConfig } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output() emitText: EventEmitter<any> = new EventEmitter();
  @Input() question!: string;

  constructor(
    public dialog: MatDialog,
    ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {question: this.question}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emitText.emit(result);
    })
  }
}
