import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DialogComponent } from '../tasks/components/dialog/dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ErrorPageComponent,
    FooterComponent,
    SidenavComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ErrorPageComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
