package com.attus.debt_recovery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProposalsDTO {

    private Long id;
    @NotNull
    @Min(1)
    private Long debtId;
    private String debtorName;
    private String debtDescription;
    private BigDecimal originalAmount;
    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal offeredAmount;
    @NotNull
    @Min(1)
    private Integer installments;
    @NotBlank
    private String status;
    private LocalDate createdAt;
}
