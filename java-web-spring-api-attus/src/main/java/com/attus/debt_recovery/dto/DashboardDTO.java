package com.attus.debt_recovery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {

    private BigDecimal totalDebtAmount;
    private BigDecimal overdueDebtAmount;
    private BigDecimal recoveredAmount;
    private BigDecimal averageDebtAmount;
    private BigDecimal recoveryRate;
    private Long totalDebts;
    private Long overdueDebts;
    private Long pendingDebts;
    private Long negotiatedDebts;
    private Long totalProposals;
    private Long acceptedProposals;
    private Long rejectedProposals;
    private Long analysisProposals;
    private List<DashboardChartItemDTO> debtsByStatus;
    private List<DashboardChartItemDTO> proposalsByStatus;
    private List<DashboardChartItemDTO> recoveryByDebtor;
}
