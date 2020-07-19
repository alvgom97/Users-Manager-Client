import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User, Address, Issurance } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  user: User;
  paramsSubscription: Subscription;

  professionalTypeList: String[] = ['Médico', 'Enfermero', 'Administrativo'];
  issurances: Issurance[];

  profileForm = new FormGroup({});
  profileFormProf = new FormGroup({});

  firstName = new FormControl;
  lastName = new FormControl;
  secondLastName = new FormControl;
  identityNumber = new FormControl;
  nhc = new FormControl;
  gender = new FormControl;
  birthdate = new FormControl;
  medicalBoardNumber = new FormControl;
  professionalType = new FormControl;

  street = new FormControl;
  number = new FormControl;
  door = new FormControl;
  postalCode = new FormControl;
  city = new FormControl;
  issuranceList = new FormControl;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router, public dialog: MatDialog) {
    this.usersService.getIssurances().subscribe(issurances => this.issurances = issurances); 
   }

  ngOnInit(): void {

    this.paramsSubscription = this.route.params.subscribe(params => {

      this.usersService.getUser(params.id)
        .subscribe(user => {
          this.user = user;

          this.firstName = new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.lastName = new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.secondLastName = new FormControl(this.user.secondLastName, [Validators.minLength(3), Validators.maxLength(20)]);
          this.identityNumber = new FormControl(this.user.identityNumber, [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
          this.gender = new FormControl(this.user.gender);
          this.birthdate = new FormControl(this.user.birthdate, [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
          this.nhc = new FormControl(this.user.nhc, [Validators.required, Validators.pattern(/^\d{10}$/)]);
          this.street = new FormControl(this.user.address.street, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.number = new FormControl(this.user.address.number, [Validators.required, Validators.pattern(/^\d*$/)]);
          this.door = new FormControl(this.user.address.door, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
          this.postalCode = new FormControl(this.user.address.postalCode, [Validators.required, Validators.pattern(/^\d{5}$/)]);
          this.city = new FormControl(this.user.address.city, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.medicalBoardNumber = new FormControl(this.user.medicalBoardNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]);
          this.professionalType = new FormControl(this.user.professionalType);
          this.issuranceList = new FormControl(this.user.issuranceList);

          this.profileForm = new FormGroup({

            firstName: this.firstName,
            lastName: this.lastName,
            secondLastName: this.secondLastName,
            identityNumber: this.identityNumber,
            gender: this.gender,
            birthdate: this.birthdate,
            nhc: this.nhc,

            street: this.street,
            number: this.number,
            door: this.door,
            postalCode: this.postalCode,
            city: this.city,

            issuranceList: this.issuranceList

          });

          this.profileFormProf = new FormGroup({

            firstName: this.firstName,
            lastName: this.lastName,
            secondLastName: this.secondLastName,
            identityNumber: this.identityNumber,
            gender: this.gender,
            birthdate: this.birthdate,
            medicalBoardNumber: this.medicalBoardNumber,
            professionalType : this.professionalType,

            street: this.street,
            number: this.number,
            door: this.door,
            postalCode: this.postalCode,
            city: this.city

          });
        }, error => {
          if (error.status === 404) {
            this.router.navigate(['Error404']);
          }
        })
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  getErrorMessage(input: FormControl) {

    let error: string;

    if (input.hasError('required')) {
      error = 'Debe introducir un valor';
    }
    else if (input.hasError('minlength')) {
      error = 'El valor es demasiado corto';
    }
    else if (input.hasError('maxlength')) {
      error = 'El valor es demasiado largo';
    }
    else if (input.hasError('pattern')) {
      error = 'El formato no es válido';
    }

    return error;
  }

  onSubmit() {
    
    let address: Address = {
      street: this.profileForm.value.street,
      number: this.profileForm.value.number,
      door: this.profileForm.value.door,
      postalCode: this.profileForm.value.postalCode,
      city: this.profileForm.value.city,
    };

    let user: User = {
      id: this.user.id,
      nhc: this.profileForm.value.nhc,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      secondLastName: this.profileForm.value.secondLastName,
      gender: this.profileForm.value.gender,
      birthdate: this.profileForm.value.birthdate,
      identityNumber: this.profileForm.value.identityNumber,
      address: address,
      issuranceList: this.profileForm.value.issuranceList
    };
    
    this.usersService.updateUser(user).subscribe(() => this.router.navigate(['users']));
  }

  onSubmitProf() {
    
    let address: Address = {
      street: this.profileFormProf.value.street,
      number: this.profileFormProf.value.number,
      door: this.profileFormProf.value.door,
      postalCode: this.profileFormProf.value.postalCode,
      city: this.profileFormProf.value.city,
    };

    let user: User = {
      id: this.user.id,
      medicalBoardNumber: this.profileFormProf.value.medicalBoardNumber,
      firstName: this.profileFormProf.value.firstName,
      lastName: this.profileFormProf.value.lastName,
      secondLastName: this.profileFormProf.value.secondLastName,
      gender: this.profileFormProf.value.gender,
      birthdate: this.profileFormProf.value.birthdate,
      identityNumber: this.profileFormProf.value.identityNumber,
      address: address,
      professionalType: this.profileFormProf.value.professionalType
    };

    this.usersService.updateUser(user).subscribe(() => this.router.navigate(['users']));

  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(UsersEditDialogComponent, {
      data: { id: id },
    });
    
    dialogRef.afterClosed().subscribe();
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class UsersEditDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService, private router: Router){}

  deleteUser(id: string){
    
    this.usersService.deleteUser(id).subscribe(() => {
      this.router.navigate(['users']);
    });
  }
}
