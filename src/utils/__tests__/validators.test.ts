import { describe, expect, it } from 'vitest';
import { isValidBirthDate, isValidCPF, isValidPhone } from '../validators';

describe('isValidCPF', () => {
  it('aceita um CPF válido', () => {
    expect(isValidCPF('111.444.777-35')).toBe(true);
  });

  it('rejeita CPF com todos os dígitos iguais', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false);
  });

  it('rejeita CPF com dígito verificador incorreto', () => {
    expect(isValidCPF('111.444.777-36')).toBe(false);
  });

  it('rejeita CPF com quantidade de dígitos incorreta', () => {
    expect(isValidCPF('123.456.789')).toBe(false);
  });
});

describe('isValidBirthDate', () => {
  it('aceita uma data válida no passado', () => {
    expect(isValidBirthDate('15/05/1990')).toBe(true);
  });

  it('rejeita datas inexistentes', () => {
    expect(isValidBirthDate('31/02/2000')).toBe(false);
  });

  it('rejeita formato incorreto', () => {
    expect(isValidBirthDate('1990-05-15')).toBe(false);
    expect(isValidBirthDate('')).toBe(false);
  });

  it('rejeita datas no futuro', () => {
    const futureYear = new Date().getFullYear() + 5;
    expect(isValidBirthDate(`01/01/${futureYear}`)).toBe(false);
  });

  it('rejeita anos anteriores a 1900', () => {
    expect(isValidBirthDate('01/01/1899')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('aceita telefone fixo com 10 dígitos', () => {
    expect(isValidPhone('(11) 2222-3333')).toBe(true);
  });

  it('aceita celular com 11 dígitos', () => {
    expect(isValidPhone('(11) 92222-3333')).toBe(true);
  });

  it('rejeita números com quantidade de dígitos incorreta', () => {
    expect(isValidPhone('123')).toBe(false);
  });
});
