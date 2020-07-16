import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    const router : Router = this.router;

    setTimeout(function(){
      console.log("nos vamos");
      router.navigate(['users']);
    }, 4000);
  }

}
