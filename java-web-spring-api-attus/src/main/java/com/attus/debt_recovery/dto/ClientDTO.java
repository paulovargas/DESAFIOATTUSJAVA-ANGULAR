package com.attus.debt_recovery.dto;

import com.attus.debt_recovery.validation.ValidCnpj;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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
    @ValidCnpj
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
