import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User, Address, Insurance } from 'src/app/models/user.model';
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
  insurances: Insurance[];

  profileForm = new FormGroup({});
  profileFormProf = new FormGroup({});

  firstName = new FormControl;
  lastName = new FormControl;
  secondLastName = new FormControl;
  identityNumber = new FormControl;
  gender = new FormControl;
  birthdate = new FormControl;

  nhc = new FormControl;
  medicalBoardNumber = new FormControl;
  professionalType = new FormControl;

  street = new FormControl;
  number = new FormControl;
  door = new FormControl;
  postalCode = new FormControl;
  city = new FormControl;
  insuranceList = new FormControl;

  firstNameProf = new FormControl;
  lastNameProf = new FormControl;
  secondLastNameProf = new FormControl;
  identityNumberProf = new FormControl;
  genderProf = new FormControl;
  birthdateProf = new FormControl;

  streetProf = new FormControl;
  numberProf = new FormControl;
  doorProf = new FormControl;
  postalCodeProf = new FormControl;
  cityProf = new FormControl;
  insuranceListProf = new FormControl;


  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router, public dialog: MatDialog) {
    this.usersService.getInsurances().subscribe(insurances => this.insurances = insurances); 
   }

  ngOnInit(): void {

    this.paramsSubscription = this.route.params.subscribe(params => {

      this.usersService.getUser(params._id)
        .subscribe(user => {
          this.user = user;

          this.firstName = new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.lastName = new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.secondLastName = new FormControl(this.user.secondLastName, [Validators.minLength(3), Validators.maxLength(20)]);
          this.identityNumber = new FormControl(this.user.identityNumber, [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
          this.gender = new FormControl(this.user.gender);
          this.birthdate = new FormControl(this.user.birthdate, [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
          this.nhc = new FormControl(this.user.nhc, [Validators.required, Validators.pattern(/^\d{10}$/)]);
          this.street = new FormControl(this.user.address.street, [Validators.minLength(3), Validators.maxLength(20)]);
          this.number = new FormControl(this.user.address.number, [Validators.pattern(/^\d*$/)]);
          this.door = new FormControl(this.user.address.door, [Validators.minLength(1), Validators.maxLength(20)]);
          this.postalCode = new FormControl(this.user.address.postalCode, [Validators.pattern(/^\d{5}$/)]);
          this.city = new FormControl(this.user.address.city, [Validators.minLength(3), Validators.maxLength(20)]);
          this.medicalBoardNumber = new FormControl(this.user.medicalBoardNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]);
          this.professionalType = new FormControl(this.user.professionalType);
          this.insuranceList = new FormControl(this.user.insuranceList);

          this.firstNameProf = new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.lastNameProf = new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.secondLastNameProf = new FormControl(this.user.secondLastName, [Validators.minLength(3), Validators.maxLength(20)]);
          this.identityNumberProf = new FormControl(this.user.identityNumber, [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
          this.genderProf = new FormControl(this.user.gender);
          this.birthdateProf = new FormControl(this.user.birthdate, [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
          this.streetProf = new FormControl(this.user.address.street, [Validators.minLength(3), Validators.maxLength(20)]);
          this.numberProf = new FormControl(this.user.address.number, [Validators.pattern(/^\d*$/)]);
          this.doorProf = new FormControl(this.user.address.door, [Validators.minLength(1), Validators.maxLength(20)]);
          this.postalCodeProf = new FormControl(this.user.address.postalCode, [Validators.pattern(/^\d{5}$/)]);
          this.cityProf = new FormControl(this.user.address.city, [Validators.minLength(3), Validators.maxLength(20)]);

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

            insuranceList: this.insuranceList

          });

          this.profileFormProf = new FormGroup({

            firstNameProf: this.firstNameProf,
            lastNameProf: this.lastNameProf,
            secondLastNameProf: this.secondLastNameProf,
            identityNumberProf: this.identityNumberProf,
            genderProf: this.genderProf,
            birthdateProf: this.birthdateProf,
            medicalBoardNumber: this.medicalBoardNumber,
            professionalType : this.professionalType,

            streetProf: this.streetProf,
            numberProf: this.numberProf,
            doorProf: this.doorProf,
            postalCodeProf: this.postalCodeProf,
            cityProf: this.cityProf

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

  submit() { 
    
    let address: Address = {
      street: this.profileForm.value.street,
      number: this.profileForm.value.number,
      door: this.profileForm.value.door,
      postalCode: this.profileForm.value.postalCode,
      city: this.profileForm.value.city,
    };

    const user: User = {
      _id: this.user._id,
      nhc: this.profileForm.value.nhc,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      secondLastName: this.profileForm.value.secondLastName,
      gender: this.profileForm.value.gender,
      birthdate: this.profileForm.value.birthdate,
      identityNumber: this.profileForm.value.identityNumber,
      address,
      insuranceList: this.profileForm.value.insuranceList
    };
    this.usersService.updateUser(user).subscribe(() => this.router.navigate(['users']));
  }

  submitProf() {
    
    const address: Address = {
      street: this.profileFormProf.value.streetProf,
      number: this.profileFormProf.value.numberProf,
      door: this.profileFormProf.value.doorProf,
      postalCode: this.profileFormProf.value.postalCodeProf,
      city: this.profileFormProf.value.cityProf,
    };

    const user: User = {
      _id: this.user._id,
      medicalBoardNumber: this.profileFormProf.value.medicalBoardNumber,
      firstName: this.profileFormProf.value.firstNameProf,
      lastName: this.profileFormProf.value.lastNameProf,
      secondLastName: this.profileFormProf.value.secondLastNameProf,
      gender: this.profileFormProf.value.genderProf,
      birthdate: this.profileFormProf.value.birthdateProf,
      identityNumber: this.profileFormProf.value.identityNumberProf,
      address,
      professionalType: this.profileFormProf.value.professionalType
    };

    this.usersService.updateUser(user).subscribe(() => this.router.navigate(['users']));

  }

  openDialog(_id: number): void {
    const dialogRef = this.dialog.open(UsersEditDialogComponent, {
      data: { _id },
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

  deleteUser(_id: string){
    
    this.usersService.deleteUser(_id).subscribe(() => {
      this.router.navigate(['users']);
    });
  }
}
