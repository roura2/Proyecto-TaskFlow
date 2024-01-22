// import { Component, Output, EventEmitter } from '@angular/core';
// import { TasksService } from '../../services/tasks.service';

// import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, } from '@angular/cdk/drag-drop';

// import { Column } from '../../interfaces/Column.interface';
// import { Subscription } from 'rxjs';
// import { ColumnsService } from '../../services/columns.service';
// import { AuthService } from 'src/app/auth/services/auth.service';
// import { MatDialog } from '@angular/material/dialog';
// import { AddColumnDialogComponent } from '../../components/add-column-dialog/add-column-dialog.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';

// @Component({
//   selector: 'app-tasks-page',
//   templateUrl: './tasks-page.component.html',
//   styleUrls: ['./tasks-page.component.css']
// })
// export class TasksPageComponent {

//   // Creo les llistes que es mostraran en el Kanban
//   columns: Column[] = []; //TODO: Implementar, que les columnes agafarles aqui, i no passarles directament al html

//   currentUser: any;

//   constructor(
//     private authService: AuthService,
//     public tasksService: TasksService,
//     private columnServie: ColumnsService,
//     private dialog: MatDialog,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit() {
//     this.authService.user$().subscribe((user) => {
//       console.log(user);

//       this.currentUser = user;
//     });
//     this.getAllColumns();
//   }

//   drop(event: CdkDragDrop<any[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex,
//       );
//     }
//   }

//   getAllColumns() {
//     this.columnServie.getColumns()
//       .subscribe((columns) => {
//         this.columns = columns;
//       });
//   }

//   onDeleteColumn(columnId: string) {
//     this.columnServie.deleteColumn(columnId)
//       .subscribe(() => {
//         this.getAllColumns();
//       });
//   }

//   onAddColumn() {
//     const addColumnDialog = this.dialog.open(AddColumnDialogComponent, {
//       width: '400px',
//     });

//     addColumnDialog.afterClosed().subscribe(column => {
//       if (column) {
//         this.columnServie.createColumn(column)
//           .subscribe(column => {
//             this.showSnackBar(`Column ${column.title} created`);
//           });
//       }
//     });
//   }

//   onAddTask(columnId: string, column: Column) {

//     const addTaskDialog = this.dialog.open(AddTaskDialogComponent, {
//       width: '400px',
//       data: column
//     });

//     addTaskDialog.afterClosed().subscribe(task => {

//       if (task) {
//         this.tasksService.createTask(task)
//           .subscribe(task => {
//             console.log(task);


//             // task = {
//             //   ...task,
//             //   column_id: columnId
//             // }

//             // this.tasksService.addTaskToColumn(task.id!, task)
//             //   .subscribe(resp => {
//             //     console.log(resp);
//             //   });
//           });
//       }
//     });
//   }

//   showSnackBar(mensaje: string) {
//     this.snackBar.open(mensaje, 'Ok!', {
//       duration: 2500
//     });
//   }
// }
