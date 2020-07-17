type professional = 'Médico'
    | 'Enfermero'
    | 'Administrativo';
type issurance = 'Salud'
    | 'Familiar'
    | 'Dental';
export interface Issurance {
    cardNumber: string;
    name: string;
    type: issurance;

}
interface Address {
    street: string;
    number: string;
    door: string;
    postalCode: string;
    city: string;
}

export interface User {
    id: string;
    NHC?: string;
    medicalBoardNumber?: string;
    firstName: string;
    lastName: string;
    secondLastName?: string;
    gender?: string;
    birthdate?: string;
    identityNumber?: string;
    address: Address;
    professionalType?: professional;
    issuranceList?: Issurance[];
}