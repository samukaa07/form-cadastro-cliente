import { describe, expect, it } from 'vitest';
import { currencyToNumber, maskCEP, maskCPF, maskCurrency, maskDate, maskPhone } from '../masks';

describe('maskCPF', () => {
  it('formata um CPF completo', () => {
    expect(maskCPF('12345678901')).toBe('123.456.789-01');
  });

  it('ignora caracteres não numéricos', () => {
    expect(maskCPF('123.456.789-01')).toBe('123.456.789-01');
  });

  it('formata parcialmente enquanto o usuário digita', () => {
    expect(maskCPF('123')).toBe('123');
    expect(maskCPF('1234')).toBe('123.4');
  });

  it('limita a 11 dígitos', () => {
    expect(maskCPF('123456789012345')).toBe('123.456.789-01');
  });
});

describe('maskPhone', () => {
  it('formata telefone fixo (10 dígitos)', () => {
    expect(maskPhone('1122223333')).toBe('(11) 2222-3333');
  });

  it('formata celular (11 dígitos)', () => {
    expect(maskPhone('11922223333')).toBe('(11) 92222-3333');
  });

  it('ignora caracteres não numéricos', () => {
    expect(maskPhone('(11) 92222-3333')).toBe('(11) 92222-3333');
  });
});

describe('maskDate', () => {
  it('formata data completa', () => {
    expect(maskDate('01011990')).toBe('01/01/1990');
  });

  it('formata parcialmente', () => {
    expect(maskDate('01')).toBe('01');
    expect(maskDate('0101')).toBe('01/01');
  });
});

describe('maskCEP', () => {
  it('formata CEP completo', () => {
    expect(maskCEP('01310100')).toBe('01310-100');
  });
});

describe('maskCurrency', () => {
  it('formata valor em reais', () => {
    expect(maskCurrency('350000')).toBe('3.500,00');
  });

  it('retorna string vazia quando não há dígitos', () => {
    expect(maskCurrency('')).toBe('');
    expect(maskCurrency('abc')).toBe('');
  });

  it('formata centavos corretamente', () => {
    expect(maskCurrency('5')).toBe('0,05');
  });
});

describe('currencyToNumber', () => {
  it('converte string formatada para número', () => {
    expect(currencyToNumber('3.500,00')).toBe(3500);
  });

  it('retorna 0 para valores inválidos ou vazios', () => {
    expect(currencyToNumber('')).toBe(0);
    expect(currencyToNumber('abc')).toBe(0);
  });
});
