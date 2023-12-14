import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') elementSidenav: any; // TODO: Posar un tipat de dades el sidenav

  sidenav: MatSidenav | undefined;

  constructor(
    private router: Router,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.getSidenav$().subscribe((sidenav) => {
      this.sidenav = sidenav;
    });
  }

  ngAfterViewInit(): void {
    const sidenav = this.elementSidenav;
    this.sharedService.setSidenav(sidenav);
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  toggleSidenav(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}
