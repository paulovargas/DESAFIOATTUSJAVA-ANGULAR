package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.DebtDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.exception.ResourceNotFoundException;
import com.attus.debt_recovery.mapper.DebtMapper;
import com.attus.debt_recovery.repository.DebtRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DebtService {

    private final DebtRepository debtRepository;
    private final DebtMapper mapper;

    public List<DebtDTO> findAll(){
        return debtRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public DebtDTO findById(Long id){
        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Divida nao encontrada."));
        return mapper.toDTO(debt);
    }

    public DebtDTO create(DebtDTO dto){
        Debt debt = mapper.toEntity(dto);
        Debt saved = debtRepository.save(debt);
        log.info("Divida criada com id={}, clientId={}, debtorId={}",
                saved.getId(),
                saved.getClient() != null ? saved.getClient().getId() : null,
                saved.getDebtor() != null ? saved.getDebtor().getId() : null);
        return mapper.toDTO(saved);
    }

    public DebtDTO update(Long id, DebtDTO dto){
        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Divida nao encontrada."));
        Debt mappedDebt = mapper.toEntity(dto);

        debt.setDescription(dto.getDescription());
        debt.setAmount(dto.getAmount());
        debt.setDueDate(dto.getDueDate());
        debt.setStatus(dto.getStatus());
        if (dto.getClient() != null) {
            debt.setClient(mappedDebt.getClient());
        }
        if (dto.getDebtor() != null) {
            debt.setDebtor(mappedDebt.getDebtor());
        }

        Debt saved = debtRepository.save(debt);
        log.info("Divida atualizada com id={}", saved.getId());
        return mapper.toDTO(saved);
    }

    public void delete(Long id){
        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Divida nao encontrada."));
        debtRepository.delete(debt);
        log.info("Divida excluida com id={}", id);
    }

    public List<DebtDTO> findByDebtorId(Long id) {
        List<Debt> debts = debtRepository.findAll();
        return debts.stream()
                .filter(debt -> debt.getDebtor().getId().equals(id))
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}
