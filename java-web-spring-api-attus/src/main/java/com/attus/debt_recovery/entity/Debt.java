package com.attus.debt_recovery.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal; // Import BigDecimal

@Entity
@Table(name = "debts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private BigDecimal amount; // Changed from Double to BigDecimal

    @Column(nullable = false)
    private java.time.LocalDate dueDate;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "debtor_id")
    private Debtor debtor;
}
