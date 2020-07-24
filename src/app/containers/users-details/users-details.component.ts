import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/user.model";
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  user: User;
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.paramsSubscription = this.route.params.subscribe(params => {

      this.usersService.getUser(params._id)
        .subscribe(user => {
          this.user = user
        }, error => {
          if (error.status === 404) {
            this.router.navigate(['Error404']);
        }})
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  openDialog(_id: number): void {
    const dialogRef = this.dialog.open(UsersDetailsDialogComponent, {
      data: { _id: _id },
    });
    
    dialogRef.afterClosed().subscribe();
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class UsersDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService, private router: Router, private snackBar: MatSnackBar){}

  deleteUser(_id: string){
    
    this.usersService.deleteUser(_id).subscribe(() => {
      this.router.navigate(['users']);
    });
  }

  openDeletedSnackBar() {
    this.snackBar.open("Usuario eliminado correctamente!", "", {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }
}
