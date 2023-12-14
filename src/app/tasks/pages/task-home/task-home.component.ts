import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { SharedService } from '../../../shared/services/shared.service';
import { SidenavComponent } from '../../../shared/components/sidenav/sidenav.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.css']
})
export class TaskHomeComponent {

  @ViewChild('sidenav') elementSidenav: any; // TODO: Posar un tipat de dades el sidenav

  constructor(
    public tasksService: TasksService,
    // private sharedService: SharedService
  ) {
  }

  addColumn(title: string) {
    if (title) {
      this.tasksService.addColumn(title);
    }
  }

  // ngAfterViewInit(): void {
  //   const sidenav = this.elementSidenav;
  //   this.sharedService.setSidenav(sidenav);
  // }
}
