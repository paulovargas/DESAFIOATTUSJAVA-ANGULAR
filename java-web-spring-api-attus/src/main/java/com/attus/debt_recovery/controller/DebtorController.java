package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.dto.DebtorDTO;
import com.attus.debt_recovery.service.DebtorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping({"/api/debtors", "/api/debitors"})
@RequiredArgsConstructor
public class DebtorController {

    private final DebtorService debtorService;

    @GetMapping
    public List<DebtorDTO> findAll(){ return debtorService.findAll(); }

    @GetMapping("/{id}")
    public DebtorDTO findById(@PathVariable Long id){ return debtorService.findById(id); }

    @PostMapping
    public DebtorDTO create(@RequestBody @Valid DebtorDTO dto){ return debtorService.create(dto); }

    @PutMapping("/{id}")
    public DebtorDTO update(@PathVariable Long id, @RequestBody @Valid DebtorDTO dto){
        return debtorService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ debtorService.delete(id); }
}
