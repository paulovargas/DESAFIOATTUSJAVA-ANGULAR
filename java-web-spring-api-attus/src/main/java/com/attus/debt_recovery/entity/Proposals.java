package com.attus.debt_recovery.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "proposals")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Proposals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "debt_id", nullable = false)
    private Debt debt;

    @Column(nullable = false)
    private BigDecimal offeredAmount;

    @Column(nullable = false)
    private Integer installments;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDate createdAt;
}
