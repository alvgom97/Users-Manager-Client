import { Component, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {name:"Listado Usuarios", route:"users", icon:"format_list_bulleted"}, 
    {name:"Nuevo Usuario", route:"users/new", icon:"add_circle_outline"}
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DrawerDialogComponent);
    
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class DrawerDialogComponent {

  constructor(private usersService: UsersService, private router: Router, private snackBar: MatSnackBar){}
  users: User[];
  doctors: User[];

  deleteDoctors(){

    this.usersService.getUsers().subscribe(users => {
      
      users.filter(u => {
        return u.professionalType === "Médico";
      }).forEach(d => {

        this.usersService.getUsers().subscribe(users => this.doctors = users);
        return this.usersService.deleteUser(d._id).subscribe(() => {
            this.router.navigate(['users']);
            window.location.reload();
          });
        },);
    });
  }

  openDeletedDoctorsSnackBar() {
    this.snackBar.open("Médicos eliminados correctamente!", "", {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }
}