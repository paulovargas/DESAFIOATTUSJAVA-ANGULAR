package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.DebtDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.mapper.DebtMapper;
import com.attus.debt_recovery.repository.DebtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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
                .orElseThrow(() -> new RuntimeException("Debt not found"));
        return mapper.toDTO(debt);
    }

    public DebtDTO create(DebtDTO dto){
        Debt debt = mapper.toEntity(dto);
        return mapper.toDTO(debtRepository.save(debt));
    }

    public DebtDTO update(Long id, DebtDTO dto){
        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debt not found"));
        debt.setAmount(dto.getAmount());

        return mapper.toDTO(debtRepository.save(debt));
    }

    public void delete(Long id){
        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debt not found"));
        debtRepository.delete(debt);
    }

    public List<DebtDTO> findByDebtorId(Long id) {
        List<Debt> debts = debtRepository.findAll();
        return debts.stream()
                .filter(debt -> debt.getDebtor().getId().equals(id))
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
}
