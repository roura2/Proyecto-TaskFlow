import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Column, ColumnDB } from '../../interfaces/Column.interface';

@Component({
  selector: 'app-add-column-dialog',
  templateUrl: './add-column-dialog.component.html',
  styleUrls: ['./add-column-dialog.component.css']
})
export class AddColumnDialogComponent {

  column: ColumnDB = {
    id: '',
    title: '',
    color: ''
  }

  constructor(
    private dialogRef: MatDialogRef<AddColumnDialogComponent>,
  ) { }

  confirmAddColumn() {
    this.dialogRef.close(this.column);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
