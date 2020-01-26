import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {MaterialModule} from "../material.module";
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { LayoutModule } from '@angular/cdk/layout';
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [HomeComponent, SidenavListComponent],
  imports: [
    CommonModule, MaterialModule, LayoutModule, AppRoutingModule
  ],
  exports: [HomeComponent, SidenavListComponent]
})
export class DashboardModule { }
