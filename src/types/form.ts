export interface PersonalData {
  fullName: string;
  birthDate: string;
  cpf: string;
  phone: string;
  email: string;
}

export interface AddressData {
  cep: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface ProfessionalData {
  company: string;
  profession: string;
  salary: string;
  companyTime: string;
}

export type CadastroFormData = PersonalData & AddressData & ProfessionalData;

export interface Profession {
  id: number;
  nome: string;
}
