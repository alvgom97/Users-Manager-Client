import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { Issurance } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class UsersCreateComponent implements OnInit {


  constructor() { }
  panelOpenState: boolean;
  selectedValue: string;

  genders: string[] = ["Mujer", "Hombre", "No Binario"];
  issuranceList: String[] = ['Salud', 'Familiar', 'Dental'];
  professionalType: String[] = ['Médico', 'Enfermero', 'Administrativo'];

  ngOnInit(): void {}

  firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastName = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumber = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
  nhc = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  medicalBoardNumber = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);

  street = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  number = new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]);
  door = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]);
  city = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  firstNamePro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastNamePro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastNamePro = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumberPro = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);

  streetPro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  numberPro = new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]);
  doorPro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  postalCodePro = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]);
  cityPro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  issuranceCardNumber = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  issuranceName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  issuranceType = new FormControl('', [Validators.required]);

  profileFormProf = new FormGroup({

    firstNamePro: this.firstNamePro,
    lastNamePro: this.lastNamePro,
    secondLastNamePro: this.secondLastNamePro,
    identityNumberPro: this.identityNumberPro,
    medicalBoardNumber: this.medicalBoardNumber,
    streetPro: this.streetPro,
    numberPro: this.numberPro,
    doorPro: this.doorPro,
    postalCodePro: this.postalCodePro,
    cityPro: this.cityPro

  });

  profileForm = new FormGroup({

    firstName: this.firstName,
    lastName: this.lastName,
    secondLastName: this.secondLastName,
    identityNumber: this.identityNumber,
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

  onSubmitProf() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileFormProf.value);
  }

}
