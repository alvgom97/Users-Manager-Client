type professional = 'Médico'
    | 'Enfermero'
    | 'Administrativo';
type insurance = 'Salud'
    | 'Familiar'
    | 'Dental';

export interface Insurance {
    cardNumber?: string;
    name?: string;
    type?: insurance;

}
export interface Address {
    street: string;
    number: string;
    door: string;
    postalCode: string;
    city: string;
}

export interface User {
    _id?: string;
    nhc?: string;
    medicalBoardNumber?: string;
    firstName: string;
    lastName: string;
    secondLastName?: string;
    gender?: string;
    birthdate?: string;
    identityNumber?: string;
    address: Address;
    professionalType?: professional;
    insuranceList?: Insurance[];
}