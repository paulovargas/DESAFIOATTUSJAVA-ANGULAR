package com.attus.debt_recovery.repository;

import com.attus.debt_recovery.entity.Debtor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DebtorRepository extends JpaRepository<Debtor, Long> {
}
