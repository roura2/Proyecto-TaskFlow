import { Component, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

  }



  signOut() {
    console.log("Hola");

    this.authService.signOut()
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/auth/sign-in']);
      })
      .catch(error => console.log(error));
  }

}
