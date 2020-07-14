import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { UsersDetailsComponent } from './containers/users-details/users-details.component';
import { UsersCreateComponent } from './containers/users-create/users-create.component';
import { UsersEditComponent } from './containers/users-edit/users-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Component } from './containers/error404/error404.component';
import { DrawerComponent, DrawerDialogComponent } from './components/drawer/drawer.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsersListComponent,
    UsersDetailsComponent,
    UsersCreateComponent,
    UsersEditComponent,
    Error404Component,
    DrawerComponent,
    DrawerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
