import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TasksService } from 'src/app/tasks/services/tasks.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input() sidenav: any;

  // constructor(
  //   public tasksService: TasksService
  // ) {}

  // addColumn(title: string) {
  //   if (title) {
  //     this.tasksService.addColumn(title);
  //   }
  // }

  sidenav: MatSidenav | undefined;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getSidenav$().subscribe((sidenav) => {
      this.sidenav = sidenav;
    });
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
