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
public class ClientDTO {

    private Long id;
    @NotBlank
    private String companyName;
    @NotBlank
    @Pattern(regexp = "\\D*(\\d\\D*){14}", message = "CNPJ deve conter 14 digitos.")
    private String cnpj;
    private String billingStreet;
    private String billingNumber;
    private String billingDistrict;
    private String billingCity;
    private String billingState;
    private String billingZipCode;
    @Email
    private String email;
    private String contactName;
    private String phone;
}
