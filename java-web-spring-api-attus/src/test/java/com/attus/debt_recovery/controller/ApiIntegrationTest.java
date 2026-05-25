package com.attus.debt_recovery.controller;

import com.attus.debt_recovery.repository.ClientRepository;
import com.attus.debt_recovery.repository.DebtRepository;
import com.attus.debt_recovery.repository.DebtorRepository;
import com.attus.debt_recovery.repository.ProposalsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:debt_recovery_test;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;MODE=PostgreSQL",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.show-sql=false"
})
@AutoConfigureMockMvc
class ApiIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private DebtorRepository debtorRepository;

    @Autowired
    private DebtRepository debtRepository;

    @Autowired
    private ProposalsRepository proposalsRepository;

    @BeforeEach
    void setUp() {
        proposalsRepository.deleteAll();
        debtRepository.deleteAll();
        debtorRepository.deleteAll();
        clientRepository.deleteAll();
    }

    @Test
    void shouldCreateClient() throws Exception {
        mockMvc.perform(post("/api/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clientJson("Empresa Teste", "12.345.678/0001-95")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.companyName").value("Empresa Teste"));
    }

    @Test
    void shouldCreateDebtor() throws Exception {
        mockMvc.perform(post("/api/debtors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(debtorJson("Joao Teste", "529.982.247-25")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.name").value("Joao Teste"));
    }

    @Test
    void shouldCreateDebt() throws Exception {
        long clientId = createClient();
        long debtorId = createDebtor();

        mockMvc.perform(post("/api/debts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(debtJson(clientId, debtorId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.amount", greaterThan(0.0)));
    }

    @Test
    void shouldCreateProposal() throws Exception {
        long clientId = createClient();
        long debtorId = createDebtor();
        long debtId = createDebt(clientId, debtorId);

        mockMvc.perform(post("/api/proposals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(proposalJson(debtId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.debtId").value((int) debtId));
    }

    @Test
    void shouldReturnValidationErrorBody() throws Exception {
        mockMvc.perform(post("/api/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clientJson("", "12.345.678/0001-10")))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Dados invalidos."))
                .andExpect(jsonPath("$.fields.companyName").exists())
                .andExpect(jsonPath("$.fields.cnpj").value("CNPJ invalido."));
    }

    @Test
    void shouldUpdateClient() throws Exception {
        long clientId = createClient();

        mockMvc.perform(put("/api/clients/" + clientId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clientJson("Empresa Atualizada", "12.345.678/0001-95")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("Empresa Atualizada"));
    }

    @Test
    void shouldDeleteProposal() throws Exception {
        long clientId = createClient();
        long debtorId = createDebtor();
        long debtId = createDebt(clientId, debtorId);
        long proposalId = createProposal(debtId);

        mockMvc.perform(delete("/api/proposals/" + proposalId))
                .andExpect(status().isOk());
    }

    @Test
    void shouldReturnNotFoundErrorBody() throws Exception {
        mockMvc.perform(put("/api/clients/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clientJson("Empresa Inexistente", "12.345.678/0001-95")))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Cliente nao encontrado."))
                .andExpect(jsonPath("$.path").value("/api/clients/999"));
    }

    private long createClient() throws Exception {
        String response = mockMvc.perform(post("/api/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clientJson("Empresa Teste", "12.345.678/0001-95")))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return idFrom(response);
    }

    private long createDebtor() throws Exception {
        String response = mockMvc.perform(post("/api/debtors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(debtorJson("Joao Teste", "529.982.247-25")))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return idFrom(response);
    }

    private long createDebt(long clientId, long debtorId) throws Exception {
        String response = mockMvc.perform(post("/api/debts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(debtJson(clientId, debtorId)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return idFrom(response);
    }

    private long createProposal(long debtId) throws Exception {
        String response = mockMvc.perform(post("/api/proposals")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(proposalJson(debtId)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return idFrom(response);
    }

    private long idFrom(String json) {
        try {
            return objectMapper.readTree(json).get("id").asLong();
        } catch (Exception exception) {
            throw new IllegalArgumentException("Nao foi possivel extrair id da resposta: " + json, exception);
        }
    }

    private String clientJson(String companyName, String cnpj) {
        return "{"
                + "\"companyName\":\"" + companyName + "\","
                + "\"cnpj\":\"" + cnpj + "\","
                + "\"billingStreet\":\"Rua Teste\","
                + "\"billingNumber\":\"100\","
                + "\"billingDistrict\":\"Centro\","
                + "\"billingCity\":\"Sao Paulo\","
                + "\"billingState\":\"SP\","
                + "\"billingZipCode\":\"01001-000\","
                + "\"email\":\"cliente@teste.com\","
                + "\"contactName\":\"Contato\","
                + "\"phone\":\"11999999999\""
                + "}";
    }

    private String debtorJson(String name, String cpfCnpj) {
        return "{"
                + "\"name\":\"" + name + "\","
                + "\"cpfCnpj\":\"" + cpfCnpj + "\","
                + "\"email\":\"devedor@teste.com\","
                + "\"phone\":\"11988888888\","
                + "\"billingStreet\":\"Rua Teste\","
                + "\"billingNumber\":\"200\","
                + "\"billingDistrict\":\"Centro\","
                + "\"billingCity\":\"Sao Paulo\","
                + "\"billingState\":\"SP\","
                + "\"billingZipCode\":\"01001-000\""
                + "}";
    }

    private String debtJson(long clientId, long debtorId) {
        return "{"
                + "\"description\":\"Contrato em atraso\","
                + "\"amount\":100.50,"
                + "\"dueDate\":\"2026-06-10\","
                + "\"status\":\"PENDENTE\","
                + "\"client\":{\"id\":" + clientId + "},"
                + "\"debtor\":{\"id\":" + debtorId + "}"
                + "}";
    }

    private String proposalJson(long debtId) {
        return "{"
                + "\"debtId\":" + debtId + ","
                + "\"offeredAmount\":90.00,"
                + "\"installments\":2,"
                + "\"status\":\"EM_ANALISE\","
                + "\"createdAt\":\"2026-06-11\""
                + "}";
    }
}
