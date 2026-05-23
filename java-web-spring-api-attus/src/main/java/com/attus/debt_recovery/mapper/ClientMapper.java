package com.attus.debt_recovery.mapper;

import com.attus.debt_recovery.dto.ClientDTO;
import com.attus.debt_recovery.entity.Client;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientDTO toDTO(Client entity);

    Client toEntity(ClientDTO dto);
}
