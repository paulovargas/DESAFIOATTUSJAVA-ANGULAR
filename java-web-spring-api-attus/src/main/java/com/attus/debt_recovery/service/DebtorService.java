package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.DebtorDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.entity.Debtor;
import com.attus.debt_recovery.mapper.DebtorMapper;
import com.attus.debt_recovery.repository.DebtorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DebtorService {

    private final DebtorRepository debtorRepository;
    private final DebtorMapper mapper;

    public List<DebtorDTO> findAll() {
        return debtorRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public DebtorDTO findById(Long id){
        Debtor debtor = debtorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debtor not found"));
        return mapper.toDTO(debtor);
    }

    public DebtorDTO create(DebtorDTO dto){
        Debtor debtor = mapper.toEntity(dto);
        return mapper.toDTO(debtorRepository.save(debtor));
    }

    public DebtorDTO update(Long id, DebtorDTO dto){
        Debtor existing = debtorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debtor not found"));

        existing.setName(dto.getName());
        existing.setCpfCnpj(dto.getCpfCnpj());
        existing.setEmail(dto.getEmail());
        existing.setPhone(dto.getPhone());
        existing.setBillingStreet(dto.getBillingStreet());
        existing.setBillingNumber(dto.getBillingNumber());
        existing.setBillingDistrict(dto.getBillingDistrict());
        existing.setBillingCity(dto.getBillingCity());
        existing.setBillingState(dto.getBillingState());
        existing.setBillingZipCode(dto.getBillingZipCode());

        return mapper.toDTO(debtorRepository.save(existing));
    }

    public void delete(Long id){ debtorRepository.deleteById(id); }
}
