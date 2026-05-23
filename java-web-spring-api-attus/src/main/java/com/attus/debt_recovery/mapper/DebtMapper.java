package com.attus.debt_recovery.mapper;

import com.attus.debt_recovery.dto.DebtDTO;
import com.attus.debt_recovery.entity.Debt;
import org.mapstruct.Mapper; // Import the Mapper annotation

@Mapper(componentModel = "spring") // Add the Mapper annotation
public interface DebtMapper {

    DebtDTO toDTO(Debt entity);

    Debt toEntity(DebtDTO dto);
}
