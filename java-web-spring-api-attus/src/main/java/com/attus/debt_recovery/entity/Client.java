package com.attus.debt_recovery.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "clients")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String cnpj;

    @Column(nullable = false)
    private String billingStreet;

    @Column(nullable = false)
    private String billingNumber;

    @Column(nullable = false)
    private String billingDistrict;

    @Column(nullable = false)
    private String billingCity;

    @Column(nullable = false)
    private String billingState;

    @Column(nullable = false)
    private String billingZipCode;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String contactName;

    @Column(nullable = false)
    private String phone;

    @OneToMany(mappedBy = "debtors")
    private List<Debtor> debtors;
}
