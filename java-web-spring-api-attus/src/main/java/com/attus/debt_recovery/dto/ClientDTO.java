package com.attus.debt_recovery.dto;

import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO {

    private Long id;
    private String companyName;
    private String cnpj;
    private String billingStreet;
    private String billingNumber;
    private String billingDistrict;
    private String billingCity;
    private String billingState;
    private String billingZipCode;
    private String email;
    private String contactName;
    private String phone;
}
