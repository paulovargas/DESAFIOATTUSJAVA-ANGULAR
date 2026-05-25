package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.dto.DashboardDTO;
import com.attus.debt_recovery.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService service;

    @GetMapping
    public DashboardDTO getDashboard() {
        return service.getDashboard();
    }
}
