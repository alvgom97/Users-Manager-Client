import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Insurance } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User, Address } from "src/app/models/user.model";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private snackBar: MatSnackBar) { }
  panelOpenState: boolean;
  selectedValue: string;

  genders: string[] = ["Mujer", "Hombre", "No Binario"];
  professionalTypeList: String[] = ['Médico', 'Enfermero', 'Administrativo']; 
  insurances: Insurance[];


  ngOnInit(): void {

    this.usersService.getInsurances().subscribe(insurances => this.insurances = insurances); 
  }

  firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastName = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumber = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
  nhc = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  medicalBoardNumber = new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]);
  birthdate = new FormControl('', [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
  gender = new FormControl();

  street = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  number = new FormControl('', [Validators.pattern(/^\d*$/)]);
  door = new FormControl('', [Validators.minLength(1), Validators.maxLength(20)]);
  postalCode = new FormControl('', [Validators.pattern(/^\d{5}$/)]);
  city = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);

  firstNameProf = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  lastNameProf = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  secondLastNameProf = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  identityNumberProf = new FormControl('', [Validators.pattern(/^\d{8}[a-zA-Z]$/)]);
  birthdateProf = new FormControl('', [Validators.pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)]);
  genderProf = new FormControl();

  streetProf = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  numberProf = new FormControl('', [Validators.pattern(/^\d*$/)]);
  doorProf = new FormControl('', [Validators.minLength(1), Validators.maxLength(20)]);
  postalCodeProf = new FormControl('', [Validators.pattern(/^\d{5}$/)]);
  cityProf = new FormControl('', [Validators.minLength(3), Validators.maxLength(20)]);
  professionalType = new FormControl();

  insuranceList = new FormControl();

  profileForm = new FormGroup({

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

  profileFormProf = new FormGroup({

    firstNameProf: this.firstNameProf,
    lastNameProf: this.lastNameProf,
    secondLastNameProf: this.secondLastNameProf,
    identityNumberProf: this.identityNumberProf,
    medicalBoardNumber: this.medicalBoardNumber,
    genderProf: this.genderProf,
    birthdateProf: this.birthdateProf,
    professionalType: this.professionalType,

    streetProf: this.streetProf,
    numberProf: this.numberProf,
    doorProf: this.doorProf,
    postalCodeProf: this.postalCodeProf,
    cityProf: this.cityProf

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
    
    let address: Address = {
      street: this.profileForm.value.street,
      number: this.profileForm.value.number,
      door: this.profileForm.value.door,
      postalCode: this.profileForm.value.postalCode,
      city: this.profileForm.value.city,
    };

    let user: User = {
      nhc: this.profileForm.value.nhc,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      secondLastName: this.profileForm.value.secondLastName,
      gender: this.profileForm.value.gender,
      birthdate: this.profileForm.value.birthdate,
      identityNumber: this.profileForm.value.identityNumber,
      address: address,
      insuranceList: this.profileForm.value.insuranceList
    };

    this.openCreatedSnackBar();
    this.usersService.createUser(user).subscribe(() => this.router.navigate(['users']));
  
  }

  onSubmitProf() {

    let address: Address = {
      street: this.profileFormProf.value.streetProf,
      number: this.profileFormProf.value.numberProf,
      door: this.profileFormProf.value.doorProf,
      postalCode: this.profileFormProf.value.postalCodeProf,
      city: this.profileFormProf.value.cityProf,
    };

    let user: User = {
      medicalBoardNumber: this.profileFormProf.value.medicalBoardNumber,
      firstName: this.profileFormProf.value.firstNameProf,
      lastName: this.profileFormProf.value.lastNameProf,
      secondLastName: this.profileFormProf.value.secondLastNameProf,
      gender: this.profileFormProf.value.genderProf,
      birthdate: this.profileFormProf.value.birthdateProf,
      identityNumber: this.profileFormProf.value.identityNumberProf,
      address: address,
      professionalType: this.profileFormProf.value.professionalType
    };

    this.openCreatedSnackBar();
    this.usersService.createUser(user).subscribe(() => this.router.navigate(['users']));
  }

  openCreatedSnackBar() {
    this.snackBar.open("Usuario creado correctamente!", "", {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }


}
