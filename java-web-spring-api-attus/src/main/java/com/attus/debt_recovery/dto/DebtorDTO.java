package com.attus.debt_recovery.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DebtorDTO {

    private Long id;
    private String name;
    private String cpfCnpj;
    private String email;
    private String phone;
    private String billingStreet;
    private String billingNumber;
    private String billingDistrict;
    private String billingCity;
    private String billingState;
    private String billingZipCode;
}
