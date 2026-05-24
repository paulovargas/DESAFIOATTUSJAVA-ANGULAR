package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.DashboardChartItemDTO;
import com.attus.debt_recovery.dto.DashboardDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.entity.Proposals;
import com.attus.debt_recovery.repository.DebtRepository;
import com.attus.debt_recovery.repository.ProposalsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private static final BigDecimal ONE_HUNDRED = new BigDecimal("100");

    private final DebtRepository debtRepository;
    private final ProposalsRepository proposalsRepository;

    public DashboardDTO getDashboard() {
        List<Debt> debts = debtRepository.findAll();
        List<Proposals> proposals = proposalsRepository.findAll();

        BigDecimal totalDebtAmount = sumDebts(debts);
        BigDecimal overdueDebtAmount = sumDebts(filterDebtsByStatus(debts, "VENCIDO"));
        BigDecimal recoveredAmount = proposals.stream()
                .filter(proposal -> isStatus(proposal.getStatus(), "ACEITA"))
                .map(Proposals::getOfferedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalDebts = debts.size();
        long overdueDebts = countDebtsByStatus(debts, "VENCIDO");
        long pendingDebts = countDebtsByStatus(debts, "PENDENTE");
        long negotiatedDebts = countDebtsByStatus(debts, "NEGOCIADO");
        long totalProposals = proposals.size();
        long acceptedProposals = countProposalsByStatus(proposals, "ACEITA");
        long rejectedProposals = countProposalsByStatus(proposals, "RECUSADA");
        long analysisProposals = countProposalsByStatus(proposals, "EM_ANALISE");

        return DashboardDTO.builder()
                .totalDebtAmount(totalDebtAmount)
                .overdueDebtAmount(overdueDebtAmount)
                .recoveredAmount(recoveredAmount)
                .averageDebtAmount(totalDebts > 0 ? totalDebtAmount.divide(BigDecimal.valueOf(totalDebts), 2, RoundingMode.HALF_UP) : BigDecimal.ZERO)
                .recoveryRate(percent(recoveredAmount, totalDebtAmount))
                .totalDebts(totalDebts)
                .overdueDebts(overdueDebts)
                .pendingDebts(pendingDebts)
                .negotiatedDebts(negotiatedDebts)
                .totalProposals(totalProposals)
                .acceptedProposals(acceptedProposals)
                .rejectedProposals(rejectedProposals)
                .analysisProposals(analysisProposals)
                .debtsByStatus(debtsByStatus(debts, totalDebtAmount))
                .proposalsByStatus(proposalsByStatus(proposals, totalProposals))
                .recoveryByDebtor(recoveryByDebtor(proposals, recoveredAmount))
                .build();
    }

    private List<DashboardChartItemDTO> debtsByStatus(List<Debt> debts, BigDecimal totalDebtAmount) {
        return debts.stream()
                .collect(Collectors.groupingBy(Debt::getStatus))
                .entrySet()
                .stream()
                .map(entry -> {
                    BigDecimal amount = sumDebts(entry.getValue());
                    return DashboardChartItemDTO.builder()
                            .label(entry.getKey())
                            .count((long) entry.getValue().size())
                            .amount(amount)
                            .percentage(percent(amount, totalDebtAmount))
                            .build();
                })
                .sorted(Comparator.comparing(DashboardChartItemDTO::getAmount).reversed())
                .collect(Collectors.toList());
    }

    private List<DashboardChartItemDTO> proposalsByStatus(List<Proposals> proposals, long totalProposals) {
        return proposals.stream()
                .collect(Collectors.groupingBy(Proposals::getStatus))
                .entrySet()
                .stream()
                .map(entry -> DashboardChartItemDTO.builder()
                        .label(entry.getKey())
                        .count((long) entry.getValue().size())
                        .amount(sumProposals(entry.getValue()))
                        .percentage(percent(BigDecimal.valueOf(entry.getValue().size()), BigDecimal.valueOf(totalProposals)))
                        .build())
                .sorted(Comparator.comparing(DashboardChartItemDTO::getCount).reversed())
                .collect(Collectors.toList());
    }

    private List<DashboardChartItemDTO> recoveryByDebtor(List<Proposals> proposals, BigDecimal recoveredAmount) {
        Map<String, List<Proposals>> acceptedByDebtor = proposals.stream()
                .filter(proposal -> isStatus(proposal.getStatus(), "ACEITA"))
                .collect(Collectors.groupingBy(proposal -> proposal.getDebt().getDebtor().getName()));

        return acceptedByDebtor.entrySet()
                .stream()
                .map(entry -> {
                    BigDecimal amount = sumProposals(entry.getValue());
                    return DashboardChartItemDTO.builder()
                            .label(entry.getKey())
                            .count((long) entry.getValue().size())
                            .amount(amount)
                            .percentage(percent(amount, recoveredAmount))
                            .build();
                })
                .sorted(Comparator.comparing(DashboardChartItemDTO::getAmount).reversed())
                .collect(Collectors.toList());
    }

    private List<Debt> filterDebtsByStatus(List<Debt> debts, String status) {
        return debts.stream()
                .filter(debt -> isStatus(debt.getStatus(), status))
                .collect(Collectors.toList());
    }

    private long countDebtsByStatus(List<Debt> debts, String status) {
        return debts.stream().filter(debt -> isStatus(debt.getStatus(), status)).count();
    }

    private long countProposalsByStatus(List<Proposals> proposals, String status) {
        return proposals.stream().filter(proposal -> isStatus(proposal.getStatus(), status)).count();
    }

    private BigDecimal sumDebts(List<Debt> debts) {
        return debts.stream()
                .map(Debt::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal sumProposals(List<Proposals> proposals) {
        return proposals.stream()
                .map(Proposals::getOfferedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal percent(BigDecimal value, BigDecimal total) {
        if (total == null || BigDecimal.ZERO.compareTo(total) == 0) {
            return BigDecimal.ZERO;
        }
        return value.multiply(ONE_HUNDRED).divide(total, 2, RoundingMode.HALF_UP);
    }

    private boolean isStatus(String current, String expected) {
        return current != null && current.equalsIgnoreCase(expected);
    }
}
