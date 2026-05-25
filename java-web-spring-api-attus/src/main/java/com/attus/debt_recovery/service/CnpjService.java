package com.attus.debt_recovery.service;

import com.attus.debt_recovery.dto.CnpjResponseDTO;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CnpjService {

    private static final String RECEITA_WS_URL = "https://www.receitaws.com.br/v1/cnpj/";

    private final RestTemplate restTemplate;
    private final Map<String, CnpjResponseDTO> cache = new ConcurrentHashMap<>();

    public CnpjService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(10))
                .build();
    }

    public CnpjResponseDTO buscar(String cnpj) {
        String cnpjLimpo = limparCnpj(cnpj);

        if (cnpjLimpo.length() != 14) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CNPJ deve conter 14 digitos.");
        }

        if (cache.containsKey(cnpjLimpo)) {
            return cache.get(cnpjLimpo);
        }

        try {
            CnpjResponseDTO response = restTemplate.getForObject(RECEITA_WS_URL + cnpjLimpo, CnpjResponseDTO.class);

            if (response == null) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Resposta vazia da ReceitaWS.");
            }

            if (!"ERROR".equals(response.getStatus())) {
                cache.put(cnpjLimpo, response);
            }

            return response;
        } catch (RestClientException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Nao foi possivel consultar o CNPJ.", exception);
        }
    }

    private String limparCnpj(String cnpj) {
        return cnpj == null ? "" : cnpj.replaceAll("\\D", "");
    }
}
