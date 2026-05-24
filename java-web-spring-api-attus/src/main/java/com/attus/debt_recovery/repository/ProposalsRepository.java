package com.attus.debt_recovery.repository;

import com.attus.debt_recovery.entity.Proposals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalsRepository extends JpaRepository<Proposals, Long> {
}
