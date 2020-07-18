import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Issurance } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {


  constructor() { }
  panelOpenState: boolean;
  selectedValue: string;

  genders: string[] = ["Mujer", "Hombre", "No Binario"];
  issuranceList: String[] = ['Salud', 'Familiar', 'Dental'];
  professionalTypeList: String[] = ['Médico', 'Enfermero', 'Administrativo']; 

  ngOnInit(): void {}

  firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastName = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumber = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
  nhc = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  medicalBoardNumber = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  birthdate = new FormControl('', [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
  gender = new FormControl();
  userType = new FormControl("Paciente");

  street = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  number = new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]);
  door = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]);
  city = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  firstNamePro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastNamePro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastNamePro = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumberPro = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
  birthdatePro = new FormControl('', [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
  genderPro = new FormControl();
  userTypePro = new FormControl("Profesional");

  streetPro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  numberPro = new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]);
  doorPro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  postalCodePro = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]);
  cityPro = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  professionalType = new FormControl();

  issuranceCardNumber = new FormControl('', [Validators.pattern(/^\d{10}$/)]);
  issuranceName = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  issuranceType = new FormControl();

  profileForm = new FormGroup({

    firstName: this.firstName,
    lastName: this.lastName,
    secondLastName: this.secondLastName,
    identityNumber: this.identityNumber,
    gender: this.gender,
    birthdate: this.birthdate,
    nhc: this.nhc,
    userType: this.userType,

    street: this.street,
    number: this.number,
    door: this.door,
    postalCode: this.postalCode,
    city: this.city,

    issuranceCardNumber: this.issuranceCardNumber,
    issuranceName: this.issuranceName,
    issuranceType: this.issuranceType

  });

  profileFormProf = new FormGroup({

    firstNamePro: this.firstNamePro,
    lastNamePro: this.lastNamePro,
    secondLastNamePro: this.secondLastNamePro,
    identityNumberPro: this.identityNumberPro,
    medicalBoardNumber: this.medicalBoardNumber,
    genderPro: this.genderPro,
    birthdatePro: this.birthdatePro,
    professionalType: this.professionalType,
    userTypePro: this.userTypePro,

    streetPro: this.streetPro,
    numberPro: this.numberPro,
    doorPro: this.doorPro,
    postalCodePro: this.postalCodePro,
    cityPro: this.cityPro

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
