import { z } from 'zod';
import { isValidBirthDate, isValidCPF, isValidPhone } from '../utils/validators';
import { currencyToNumber } from '../utils/masks';

export const personalDataFields = ['fullName', 'birthDate', 'cpf', 'phone', 'email'] as const;
export const addressFields = ['cep', 'address', 'neighborhood', 'city', 'state'] as const;
export const professionalFields = ['company', 'profession', 'salary', 'companyTime'] as const;

export const cadastroSchema = z.object({
  // Etapa 1 - Dados pessoais
  fullName: z
    .string()
    .trim()
    .min(1, 'Informe o nome completo')
    .refine((value) => value.trim().split(/\s+/).length >= 2, 'Informe nome e sobrenome'),
  birthDate: z
    .string()
    .min(1, 'Informe a data de nascimento')
    .refine(isValidBirthDate, 'Data de nascimento inválida'),
  cpf: z
    .string()
    .min(1, 'Informe o CPF')
    .refine(isValidCPF, 'CPF inválido'),
  phone: z
    .string()
    .min(1, 'Informe o telefone')
    .refine(isValidPhone, 'Telefone inválido'),
  email: z.string().min(1, 'Informe o e-mail').email('E-mail inválido'),

  // Etapa 2 - Endereço
  cep: z
    .string()
    .min(1, 'Informe o CEP')
    .refine((value) => value.replace(/\D/g, '').length === 8, 'CEP inválido'),
  address: z.string().trim().min(1, 'Informe o endereço'),
  neighborhood: z.string().trim().min(1, 'Informe o bairro'),
  city: z.string().trim().min(1, 'Informe a cidade'),
  state: z.string().trim().min(1, 'Informe o estado'),

  // Etapa 3 - Dados profissionais
  company: z.string().trim().min(1, 'Informe a empresa'),
  profession: z.string().min(1, 'Selecione a profissão'),
  salary: z
    .string()
    .min(1, 'Informe o salário')
    .refine((value) => currencyToNumber(value) > 0, 'Informe um salário válido'),
  companyTime: z.string().trim().min(1, 'Informe o tempo de empresa'),
});

export type CadastroFormValues = z.infer<typeof cadastroSchema>;
