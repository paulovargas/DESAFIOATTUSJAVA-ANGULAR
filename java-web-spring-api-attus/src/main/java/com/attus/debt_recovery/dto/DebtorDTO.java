package com.attus.debt_recovery.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DebtorDTO {

    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    @Pattern(regexp = "\\D*((\\d\\D*){11}|(\\d\\D*){14})", message = "CPF/CNPJ deve conter 11 ou 14 digitos.")
    private String cpfCnpj;
    @Email
    private String email;
    private String phone;
    private String billingStreet;
    private String billingNumber;
    private String billingDistrict;
    private String billingCity;
    private String billingState;
    private String billingZipCode;
}
