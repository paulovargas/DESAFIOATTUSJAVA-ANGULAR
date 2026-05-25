package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.ProposalsDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.entity.Proposals;
import com.attus.debt_recovery.exception.ResourceNotFoundException;
import com.attus.debt_recovery.repository.DebtRepository;
import com.attus.debt_recovery.repository.ProposalsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProposalsService {

    private final ProposalsRepository proposalsRepository;
    private final DebtRepository debtRepository;

    public List<ProposalsDTO> findAll() {
        return proposalsRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProposalsDTO findById(Long id) {
        return toDTO(findEntityById(id));
    }

    public ProposalsDTO create(ProposalsDTO dto) {
        Proposals proposal = Proposals.builder()
                .debt(findDebtById(dto.getDebtId()))
                .offeredAmount(dto.getOfferedAmount())
                .installments(dto.getInstallments())
                .status(dto.getStatus())
                .createdAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : LocalDate.now())
                .build();

        Proposals saved = proposalsRepository.save(proposal);
        log.info("Proposta criada com id={}, debtId={}", saved.getId(), saved.getDebt().getId());
        return toDTO(saved);
    }

    public ProposalsDTO update(Long id, ProposalsDTO dto) {
        Proposals proposal = findEntityById(id);

        if (dto.getDebtId() != null) {
            proposal.setDebt(findDebtById(dto.getDebtId()));
        }
        proposal.setOfferedAmount(dto.getOfferedAmount());
        proposal.setInstallments(dto.getInstallments());
        proposal.setStatus(dto.getStatus());
        proposal.setCreatedAt(dto.getCreatedAt() != null ? dto.getCreatedAt() : proposal.getCreatedAt());

        Proposals saved = proposalsRepository.save(proposal);
        log.info("Proposta atualizada com id={}", saved.getId());
        return toDTO(saved);
    }

    public void delete(Long id) {
        proposalsRepository.delete(findEntityById(id));
        log.info("Proposta excluida com id={}", id);
    }

    private Proposals findEntityById(Long id) {
        return proposalsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposta nao encontrada."));
    }

    private Debt findDebtById(Long id) {
        return debtRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Divida nao encontrada."));
    }

    private ProposalsDTO toDTO(Proposals proposal) {
        Debt debt = proposal.getDebt();

        return ProposalsDTO.builder()
                .id(proposal.getId())
                .debtId(debt.getId())
                .debtorName(debt.getDebtor().getName())
                .debtDescription(debt.getDescription())
                .originalAmount(debt.getAmount())
                .offeredAmount(proposal.getOfferedAmount())
                .installments(proposal.getInstallments())
                .status(proposal.getStatus())
                .createdAt(proposal.getCreatedAt())
                .build();
    }
}
