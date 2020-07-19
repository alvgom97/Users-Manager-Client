import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
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

  issuranceList: String[] = ['Salud', 'Familiar', 'Dental'];
  professionalTypeList: String[] = ['Médico', 'Enfermero', 'Administrativo'];

  profileForm = new FormGroup({});
  profileFormPro = new FormGroup({});

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
  // issuranceCardNumber: FormControl;
  // issuranceName: FormControl;
  // issuranceType: FormControl;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router, public dialog: MatDialog) { }

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
          this.door = new FormControl(this.user.address.door, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.postalCode = new FormControl(this.user.address.postalCode, [Validators.required, Validators.pattern(/^\d{5}$/)]);
          this.city = new FormControl(this.user.address.city, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
          this.medicalBoardNumber = new FormControl(this.user.medicalBoardNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]);
          this.professionalType = new FormControl(this.user.professionalType);
          // this.issuranceCardNumber = new FormControl(this.user.issuranceList[0].cardNumber, [Validators.pattern(/^\d{10}$/)]);
          // this.issuranceName = new FormControl(this.user.issuranceList[0].name, [Validators.minLength(3), Validators.maxLength(20)]);
          // this.issuranceType = new FormControl(this.user.issuranceList[0].type);

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

            // issuranceCardNumber: this.issuranceCardNumber,
            // issuranceName: this.issuranceName,
            // issuranceType: this.issuranceType

          });

          this.profileFormPro = new FormGroup({

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
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  onSubmitPro() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileFormPro.value);
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

  deleteUser(id: number){
    
    this.usersService.deleteUser(id).subscribe(() => {
      this.router.navigate(['users']);
    });
  }
}
