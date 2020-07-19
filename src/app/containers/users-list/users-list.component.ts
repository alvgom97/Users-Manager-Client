import { Component, OnInit, Inject } from '@angular/core';
import { User, Issurance } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(UsersListDialogComponent, {
      data: { id: id },
    });
    
    dialogRef.afterClosed().subscribe();
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class UsersListDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService){}

  deleteUser(id: string){
    
    this.usersService.deleteUser(id).subscribe(() => {
      window.location.reload();
    });
  }
}