package com.attus.debt_recovery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProposalsDTO {

    private Long id;
    private Long debtId;
    private String debtorName;
    private String debtDescription;
    private BigDecimal originalAmount;
    private BigDecimal offeredAmount;
    private Integer installments;
    private String status;
    private LocalDate createdAt;
}
