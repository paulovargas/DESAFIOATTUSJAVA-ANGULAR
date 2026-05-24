package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.ClientDTO;
import com.attus.debt_recovery.entity.Client;
import com.attus.debt_recovery.mapper.ClientMapper;
import com.attus.debt_recovery.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return mapper.toDTO(client);
    }

    public ClientDTO create(ClientDTO dto){
        Client client = mapper.toEntity(dto);
        return mapper.toDTO(clientRepository.save(client));
    }

    public ClientDTO update(Long id, ClientDTO dto){
        Client existing = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

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

        return mapper.toDTO(clientRepository.save(existing));
    }

    public void delete(Long id){ clientRepository.deleteById(id);}
}
