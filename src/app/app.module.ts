import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersListComponent, UsersListDialogComponent } from './containers/users-list/users-list.component';
import { UsersDetailsComponent, UsersDetailsDialogComponent } from './containers/users-details/users-details.component';
import { UsersCreateComponent } from './containers/users-create/users-create.component';
import { UsersEditComponent, UsersEditDialogComponent } from './containers/users-edit/users-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Component } from './containers/error404/error404.component';
import { DrawerComponent, DrawerDialogComponent } from './components/drawer/drawer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTreeModule } from "@angular/material/tree"; 

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
    DrawerDialogComponent,
    UsersListDialogComponent,
    UsersDetailsDialogComponent,
    UsersEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,      

    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
