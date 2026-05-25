package com.attus.debt_recovery.validation;

public final class DocumentValidator {

    private DocumentValidator() {
    }

    public static String onlyNumbers(String value) {
        return value == null ? "" : value.replaceAll("\\D", "");
    }

    public static boolean isValidCpf(String value) {
        String cpf = onlyNumbers(value);

        if (cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        return cpfDigit(cpf, 10) == Character.getNumericValue(cpf.charAt(9))
                && cpfDigit(cpf, 11) == Character.getNumericValue(cpf.charAt(10));
    }

    public static boolean isValidCnpj(String value) {
        String cnpj = onlyNumbers(value);

        if (cnpj.length() != 14 || cnpj.matches("(\\d)\\1{13}")) {
            return false;
        }

        return cnpjDigit(cnpj, new int[] {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2})
                == Character.getNumericValue(cnpj.charAt(12))
                && cnpjDigit(cnpj, new int[] {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2})
                == Character.getNumericValue(cnpj.charAt(13));
    }

    public static boolean isValidCpfOrCnpj(String value) {
        String document = onlyNumbers(value);
        return document.length() == 11 ? isValidCpf(document) : isValidCnpj(document);
    }

    private static int cpfDigit(String cpf, int factor) {
        int total = 0;

        for (int index = 0; index < factor - 1; index++) {
            total += Character.getNumericValue(cpf.charAt(index)) * (factor - index);
        }

        int rest = (total * 10) % 11;
        return rest == 10 ? 0 : rest;
    }

    private static int cnpjDigit(String cnpj, int[] weights) {
        int total = 0;

        for (int index = 0; index < weights.length; index++) {
            total += Character.getNumericValue(cnpj.charAt(index)) * weights[index];
        }

        int rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    }
}
