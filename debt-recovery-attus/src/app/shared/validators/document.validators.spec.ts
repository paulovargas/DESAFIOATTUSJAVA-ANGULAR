import { FormControl } from '@angular/forms';
import { cnpjValidator, cpfCnpjValidator, onlyNumbers } from './document.validators';

describe('document validators', () => {
  describe('onlyNumbers', () => {
    it('should remove non numeric characters', () => {
      expect(onlyNumbers('12.345.678/0001-95')).toBe('12345678000195');
    });
  });

  describe('cnpjValidator', () => {
    it('should accept a valid CNPJ with mask', () => {
      const control = new FormControl('12.345.678/0001-95');

      expect(cnpjValidator()(control)).toBeNull();
    });

    it('should reject an invalid CNPJ check digit', () => {
      const control = new FormControl('12.345.678/0001-10');

      expect(cnpjValidator()(control)).toEqual({ cnpj: true });
    });

    it('should reject repeated digits', () => {
      const control = new FormControl('11.111.111/1111-11');

      expect(cnpjValidator()(control)).toEqual({ cnpj: true });
    });
  });

  describe('cpfCnpjValidator', () => {
    it('should accept a valid CPF', () => {
      const control = new FormControl('529.982.247-25');

      expect(cpfCnpjValidator()(control)).toBeNull();
    });

    it('should accept a valid CNPJ', () => {
      const control = new FormControl('12.345.678/0001-95');

      expect(cpfCnpjValidator()(control)).toBeNull();
    });

    it('should reject an invalid CPF check digit', () => {
      const control = new FormControl('529.982.247-24');

      expect(cpfCnpjValidator()(control)).toEqual({ cpfCnpj: true });
    });

    it('should reject documents with invalid length', () => {
      const control = new FormControl('123456789');

      expect(cpfCnpjValidator()(control)).toEqual({ cpfCnpj: true });
    });
  });
});

