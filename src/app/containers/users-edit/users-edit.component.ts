import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  user: User;
  paramsSubscription: Subscription;

  issuranceList: String[] = ['Salud', 'Familiar', 'Dental'];
  professionalType: String[] = ['Médico', 'Enfermero', 'Administrativo'];

  firstName: FormControl;
  lastName: FormControl;
  secondLastName: FormControl;
  identityNumber: FormControl;
  nhc: FormControl;
  gender: FormControl;
  birthdate: FormControl;
  street: FormControl;
  number: FormControl;
  door: FormControl;
  postalCode: FormControl;
  city: FormControl;
  issuranceCardNumber: FormControl;
  issuranceName: FormControl;
  issuranceType: FormControl;

  profileForm: FormGroup;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) { }

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
          this.issuranceCardNumber = new FormControl(this.user.issuranceList[0].cardNumber, [Validators.pattern(/^\d{10}$/)]);
          this.issuranceName = new FormControl(this.user.issuranceList[0].name, [Validators.minLength(3), Validators.maxLength(20)]);
          this.issuranceType = new FormControl(this.user.issuranceList[0].type);

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

            issuranceCardNumber: this.issuranceCardNumber,
            issuranceName: this.issuranceName,
            issuranceType: this.issuranceType

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

}
