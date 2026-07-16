// Validação de CPF com o algoritmo oficial dos dígitos verificadores.
export function isValidCPF(rawCpf: string): boolean {
  const cpf = rawCpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  // CPFs com todos os dígitos iguais são inválidos (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== Number(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;
  if (secondCheck !== Number(cpf[10])) return false;

  return true;
}

// Valida se a data (dd/mm/aaaa) é uma data real e não está no futuro.
export function isValidBirthDate(value: string): boolean {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isRealDate) return false;
  if (date > new Date()) return false;
  if (year < 1900) return false;

  return true;
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}
