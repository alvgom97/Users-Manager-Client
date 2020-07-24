import { Component, OnInit, Inject } from '@angular/core';
import { User, Insurance } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[];
  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.usersService.getUsers().subscribe(users => this.users = users);         
  }

  openDialog(_id: number): void {
    const dialogRef = this.dialog.open(UsersListDialogComponent, {
      data: { _id: _id },
    });
    
    dialogRef.afterClosed().subscribe(() => this.usersService.getUsers().subscribe(users => this.users = users));
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class UsersListDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService, private snackBar: MatSnackBar){}

  deleteUser(_id: string){
    
    this.usersService.deleteUser(_id).subscribe();
  }

  openDeletedSnackBar() {
    this.snackBar.open("Usuario eliminado correctamente!", "", {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }
  
}