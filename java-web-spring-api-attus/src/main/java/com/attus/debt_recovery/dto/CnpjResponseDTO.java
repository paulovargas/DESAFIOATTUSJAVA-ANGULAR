package com.attus.debt_recovery.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CnpjResponseDTO {

    private String status;
    private String message;
    private String cnpj;
    private String nome;
    private String fantasia;
    private String logradouro;
    private String numero;
    private String bairro;
    private String municipio;
    private String uf;
    private String cep;
    private String email;
    private String telefone;
}
