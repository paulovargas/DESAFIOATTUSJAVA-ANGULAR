package com.attus.debt_recovery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DebtDTO {

    private Long id;
    @NotBlank
    private String description;
    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal amount;
    @NotNull
    private LocalDate dueDate;
    @NotBlank
    private String status;
    @NotNull
    private ClientDTO client;
    @NotNull
    private DebtorDTO debtor;
}
