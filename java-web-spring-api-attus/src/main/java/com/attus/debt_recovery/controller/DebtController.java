package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.dto.DebtDTO;
import com.attus.debt_recovery.entity.Debt;
import com.attus.debt_recovery.service.DebtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/debts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DebtController {

    private final DebtService service;

    @GetMapping
    public List<DebtDTO> findAll(){ return service.findAll(); }

    @GetMapping("/{id}")
    public DebtDTO findById(@PathVariable Long id){ return service.findById(id); }

    @PostMapping
    public DebtDTO create(@RequestBody @Valid DebtDTO dto){ return service.create(dto); }

    @PutMapping("/{id}")
    public DebtDTO update(@PathVariable Long id, @RequestBody @Valid DebtDTO dto){
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ service.delete(id); }

    @GetMapping("/debtor/{id}")
    public List<DebtDTO> findByDebtorId(@PathVariable Long id) {
        return service.findByDebtorId(id);
    }
}
