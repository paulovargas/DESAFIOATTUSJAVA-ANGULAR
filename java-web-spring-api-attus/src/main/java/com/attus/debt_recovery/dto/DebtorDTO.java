package com.attus.debt_recovery.dto;

import com.attus.debt_recovery.validation.ValidCpfCnpj;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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
    @ValidCpfCnpj
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
