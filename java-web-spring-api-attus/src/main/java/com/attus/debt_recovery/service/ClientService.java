package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.ClientDTO;
import com.attus.debt_recovery.entity.Client;
import com.attus.debt_recovery.exception.ResourceNotFoundException;
import com.attus.debt_recovery.mapper.ClientMapper;
import com.attus.debt_recovery.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper mapper;

    public List<ClientDTO> findAll(){
        return clientRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO findById(Long id){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente nao encontrado."));
        return mapper.toDTO(client);
    }

    public ClientDTO create(ClientDTO dto){
        Client client = mapper.toEntity(dto);
        Client saved = clientRepository.save(client);
        log.info("Cliente criado com id={}", saved.getId());
        return mapper.toDTO(saved);
    }

    public ClientDTO update(Long id, ClientDTO dto){
        Client existing = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente nao encontrado."));

        existing.setCompanyName(dto.getCompanyName());
        existing.setCnpj(dto.getCnpj());
        existing.setBillingStreet(dto.getBillingStreet());
        existing.setBillingNumber(dto.getBillingNumber());
        existing.setBillingDistrict(dto.getBillingDistrict());
        existing.setBillingCity(dto.getBillingCity());
        existing.setBillingState(dto.getBillingState());
        existing.setBillingZipCode(dto.getBillingZipCode());
        existing.setEmail(dto.getEmail());
        existing.setContactName(dto.getContactName());
        existing.setPhone(dto.getPhone());

        Client saved = clientRepository.save(existing);
        log.info("Cliente atualizado com id={}", saved.getId());
        return mapper.toDTO(saved);
    }

    public void delete(Long id){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente nao encontrado."));
        clientRepository.delete(client);
        log.info("Cliente excluido com id={}", id);
    }
}
