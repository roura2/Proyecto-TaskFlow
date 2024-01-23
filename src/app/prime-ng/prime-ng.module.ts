import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';



@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    RadioButtonModule,
    SidebarModule,
    SplitterModule,
    StepsModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule
  ]
})
export class PrimeNgModule { }
