package com.attus.debt_recovery.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "debtors")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Debtor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String cpfCnpj;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

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

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "debtor")
    private List<Debt> debts;


}
