import { Component, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {


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
