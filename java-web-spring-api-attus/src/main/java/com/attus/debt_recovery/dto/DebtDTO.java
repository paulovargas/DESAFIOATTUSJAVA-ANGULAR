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
public class DebtDTO {

    private Long id;
    private String description;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String status;
    private ClientDTO client;
    private DebtorDTO debtor;
}
