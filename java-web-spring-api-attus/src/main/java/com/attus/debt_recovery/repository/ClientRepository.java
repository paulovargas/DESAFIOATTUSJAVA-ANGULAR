package com.attus.debt_recovery.repository;

import com.attus.debt_recovery.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
