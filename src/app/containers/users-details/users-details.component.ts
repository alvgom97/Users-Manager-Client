import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  user: User;
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) { }

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

}
