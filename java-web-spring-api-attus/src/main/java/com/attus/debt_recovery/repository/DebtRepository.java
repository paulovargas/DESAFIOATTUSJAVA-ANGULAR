package com.attus.debt_recovery.repository;

import com.attus.debt_recovery.entity.Debt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DebtRepository extends JpaRepository<Debt, Long> {
}
