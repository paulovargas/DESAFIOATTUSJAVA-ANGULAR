package com.attus.debt_recovery.dto;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class DtoValidationTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        validatorFactory.close();
    }

    @Test
    void shouldValidateRequiredClientFields() {
        ClientDTO dto = ClientDTO.builder()
                .companyName("")
                .cnpj("123")
                .email("invalid-email")
                .build();

        assertThat(validator.validate(dto))
                .extracting(violation -> violation.getPropertyPath().toString())
                .contains("companyName", "cnpj", "email");
    }

    @Test
    void shouldAcceptValidClientPayload() {
        ClientDTO dto = ClientDTO.builder()
                .companyName("Empresa Teste")
                .cnpj("12.345.678/0001-95")
                .email("empresa@teste.com")
                .build();

        assertThat(validator.validate(dto)).isEmpty();
    }

    @Test
    void shouldValidateRequiredDebtorFields() {
        DebtorDTO dto = DebtorDTO.builder()
                .name("")
                .cpfCnpj("123")
                .email("invalid-email")
                .build();

        assertThat(validator.validate(dto))
                .extracting(violation -> violation.getPropertyPath().toString())
                .contains("name", "cpfCnpj", "email");
    }

    @Test
    void shouldValidateDebtPayload() {
        DebtDTO dto = DebtDTO.builder()
                .description("")
                .amount(BigDecimal.ZERO)
                .status("")
                .build();

        assertThat(validator.validate(dto))
                .extracting(violation -> violation.getPropertyPath().toString())
                .contains("description", "amount", "dueDate", "status", "client", "debtor");
    }

    @Test
    void shouldAcceptValidDebtPayload() {
        DebtDTO dto = DebtDTO.builder()
                .description("Contrato em atraso")
                .amount(new BigDecimal("100.00"))
                .dueDate(LocalDate.now())
                .status("PENDENTE")
                .client(ClientDTO.builder().id(1L).build())
                .debtor(DebtorDTO.builder().id(1L).build())
                .build();

        assertThat(validator.validate(dto)).isEmpty();
    }

    @Test
    void shouldValidateProposalPayload() {
        ProposalsDTO dto = ProposalsDTO.builder()
                .debtId(0L)
                .offeredAmount(BigDecimal.ZERO)
                .installments(0)
                .status("")
                .build();

        assertThat(validator.validate(dto))
                .extracting(violation -> violation.getPropertyPath().toString())
                .contains("debtId", "offeredAmount", "installments", "status");
    }
}
