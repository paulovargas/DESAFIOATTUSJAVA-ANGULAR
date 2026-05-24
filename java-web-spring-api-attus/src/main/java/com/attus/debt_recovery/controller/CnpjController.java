package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.dto.CnpjResponseDTO;
import com.attus.debt_recovery.service.CnpjService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cnpj")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CnpjController {

    private final CnpjService service;

    @GetMapping("/{cnpj}")
    public CnpjResponseDTO buscar(@PathVariable String cnpj) {
        return service.buscar(cnpj);
    }
}
