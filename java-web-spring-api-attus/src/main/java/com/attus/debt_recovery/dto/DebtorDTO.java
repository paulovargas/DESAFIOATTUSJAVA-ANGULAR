package com.attus.debt_recovery.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DebtorDTO {

    private Long id;
    private String name;
    private BigDecimal amount;
}
