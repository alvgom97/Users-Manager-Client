import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/user.model";
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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

      this.usersService.getUser(params.id)
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

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(UsersDetailsDialogComponent, {
      data: { id: id },
    });
    
    dialogRef.afterClosed().subscribe();
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class UsersDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService, private router: Router){}

  deleteUser(id: number){
    
    this.usersService.deleteUser(id).subscribe(() => {
      this.router.navigate(['users']);
    });
  }
}
