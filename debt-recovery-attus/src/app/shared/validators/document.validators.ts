import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfCnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = onlyNumbers(control.value);

    if (!value) {
      return null;
    }

    if (value.length === 11 && isValidCpf(value)) {
      return null;
    }

    if (value.length === 14 && isValidCnpj(value)) {
      return null;
    }

    return { cpfCnpj: true };
  };
}

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = onlyNumbers(control.value);

    if (!value) {
      return null;
    }

    return value.length === 14 && isValidCnpj(value) ? null : { cnpj: true };
  };
}

export function onlyNumbers(value: unknown): string {
  return String(value || '').replace(/\D/g, '');
}

function isValidCpf(cpf: string): boolean {
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const digit = (factor: number) => {
    let total = 0;

    for (let index = 0; index < factor - 1; index++) {
      total += Number(cpf[index]) * (factor - index);
    }

    const rest = (total * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return digit(10) === Number(cpf[9]) && digit(11) === Number(cpf[10]);
}

function isValidCnpj(cnpj: string): boolean {
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const digit = (weights: number[]) => {
    const total = weights.reduce((sum, weight, index) => sum + Number(cnpj[index]) * weight, 0);
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  return (
    digit([5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(cnpj[12]) &&
    digit([6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]) === Number(cnpj[13])
  );
}
