package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.DebtorDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.entity.Debtor;
import com.attus.debt_recovery.exception.ResourceNotFoundException;
import com.attus.debt_recovery.mapper.DebtorMapper;
import com.attus.debt_recovery.repository.DebtorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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
                .orElseThrow(() -> new ResourceNotFoundException("Devedor nao encontrado."));
        return mapper.toDTO(debtor);
    }

    public DebtorDTO create(DebtorDTO dto){
        Debtor debtor = mapper.toEntity(dto);
        Debtor saved = debtorRepository.save(debtor);
        log.info("Devedor criado com id={}", saved.getId());
        return mapper.toDTO(saved);
    }

    public DebtorDTO update(Long id, DebtorDTO dto){
        Debtor existing = debtorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Devedor nao encontrado."));

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

        Debtor saved = debtorRepository.save(existing);
        log.info("Devedor atualizado com id={}", saved.getId());
        return mapper.toDTO(saved);
    }

    public void delete(Long id){
        Debtor debtor = debtorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Devedor nao encontrado."));
        debtorRepository.delete(debtor);
        log.info("Devedor excluido com id={}", id);
    }
}
