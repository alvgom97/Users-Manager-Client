import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

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

  ngOnInit(): void {}

  firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastName = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumber = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
  nhc = new FormControl('', [Validators.pattern(/^\d{10}$/)]);
  medicalBoardNumber = new FormControl('', [Validators.pattern(/^\d{10}$/)]);

  street = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  number = new FormControl('', [Validators.required, Validators.pattern(/^\d*$/)]);
  door = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  postalCode = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]);
  city = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

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

}
