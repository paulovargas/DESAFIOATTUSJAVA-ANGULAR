package com.attus.debt_recovery.mapper;

import com.attus.debt_recovery.dto.DebtorDTO;
import com.attus.debt_recovery.entity.Debtor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DebtorMapper {

    DebtorDTO toDTO(Debtor entity);

    Debtor toEntity(DebtorDTO dto);
}
