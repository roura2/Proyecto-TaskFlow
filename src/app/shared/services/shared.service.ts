import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private sidenavSubject = new BehaviorSubject<MatSidenav | undefined>(undefined);

  setSidenav(sidenav: MatSidenav): void {
    this.sidenavSubject.next(sidenav);
  }

  getSidenav$() {
    return this.sidenavSubject.asObservable();
  }
}
