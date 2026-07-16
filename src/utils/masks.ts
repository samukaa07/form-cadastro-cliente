// Funções de máscara para os campos do formulário.
// Todas recebem o valor "cru" digitado e devolvem a string já formatada.

export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

export function maskDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  return digits
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
}

export function maskCEP(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  return digits.replace(/(\d{5})(\d)/, '$1-$2');
}

// Máscara de salário no formato monetário brasileiro (ex: 3.500,00)
export function maskCurrency(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (!digits) return '';

  const numberValue = Number(digits) / 100;

  return numberValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function currencyToNumber(value: string): number {
  if (!value) return 0;

  const normalized = value.replace(/\./g, '').replace(',', '.');
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? 0 : parsed;
}
