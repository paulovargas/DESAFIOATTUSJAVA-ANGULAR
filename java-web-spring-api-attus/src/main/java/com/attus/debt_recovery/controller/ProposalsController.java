package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.dto.ProposalsDTO;
import com.attus.debt_recovery.service.ProposalsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/proposals")
@RequiredArgsConstructor
public class ProposalsController {

    private final ProposalsService service;

    @GetMapping
    public List<ProposalsDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ProposalsDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ProposalsDTO create(@RequestBody @Valid ProposalsDTO dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    public ProposalsDTO update(@PathVariable Long id, @RequestBody @Valid ProposalsDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
