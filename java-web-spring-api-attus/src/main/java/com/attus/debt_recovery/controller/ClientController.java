package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.dto.ClientDTO;
import com.attus.debt_recovery.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService service;

    @GetMapping
    public List<ClientDTO> findAll(){ return service.findAll(); }

    @GetMapping("/{id}")
    public ClientDTO findById(@PathVariable Long id){ return service.findById(id); }

    @PostMapping
    public ClientDTO create(@RequestBody @Valid ClientDTO dto){ return service.create(dto); }

    @PutMapping("/{id}")
    public ClientDTO update(@PathVariable Long id, @RequestBody @Valid ClientDTO dto){
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ service.delete(id); }
}
